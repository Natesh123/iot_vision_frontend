import { Component, OnInit,ChangeDetectorRef,ViewEncapsulation,ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/index';
import Swal from 'sweetalert2';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {
  model:any ={};
  response:any;
  systemData:any;
  Notifiemails:any;  
  email_config:any;
  @ViewChild('f', {static: false}) passwordconfig;
  @ViewChild('form', {static: false}) emailconfig;
  @ViewChild('email_form', {static: false}) email_form;
  constructor(private authenticationService: AuthenticationService,
              private chRef: ChangeDetectorRef) { }

    settings = {

    actions: {
      add: false,
      edit:false,
      delete: false,
      position: 'right',
       custom: [{ name: 'viewrecord', title: '<i title="see details" class="fa fa-trash" style="font-size: 20px !important;justify-content: left !important;padding-top: 10% !important;"></i>' }],
    },
    columns: {
	  email_id: {
	    title: 'Email Id',
	    type: 'string'
      },
     },
     button1: {
      title:'Action',
      type:'custom',
      filter:true,
    }
    
  };

  source: LocalDataSource = new LocalDataSource();

  ngOnInit() {

  	this.getEmails();
     var currentUser = JSON.parse(localStorage.getItem('currentUser'));

     if(currentUser.user_role == 1){
       this.email_config = 1;
     } else{
       this.email_config = 0;
     }
  }

  getEmails(){
     this.authenticationService.getNotificationEmails().then((result)=>{
      console.log(result); 
      this.response = result;
      this.Notifiemails = this.response.records;
      this.source.load(this.Notifiemails);  
    })
  }

  changePassword(){

 	var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    var json = {
      "user_id": currentUser._id,
      "username": this.model.user_name,
      "current_pass": this.model.current_pass,
      "new_pass": this.model.new_pass      
    };

    this.authenticationService.changePassword(json).then((result)=>{
      console.log(result); 
      this.response = result;
      if(this.response.status == 'success'){
        Swal.fire(
          'Password Changed Succesfully !',
          '',
          'success'
        );
        this.passwordconfig.resetForm();
      } else{
      	 Swal.fire(
          'Invalid Username or Current Password',
          '',
          'error'
        );
      }
    })
  }


  updateEmailSettings(){
  	  var settings = JSON.parse(localStorage.getItem('system_settings'));

  	    var json = {
        "_id": settings._id,
        "email_id": this.model.email,
        "password": this.model.password, 
      }
  
      this.authenticationService.updateEmailSystemSettings(json).then((result)=>{
          this.response = result;
          this.systemData = this.response;
          
          if(this.systemData.status ==  'success'){
             Swal.fire(
	          'Email Notification Configured Succesfully',
	          '',
	          'success'
	        );
          }
         this.emailconfig.resetForm();
    
      })
  }


  addNotifiEmail(){

  	  var json = {
        "email_id": this.model.email_id,
      }
  
      this.authenticationService.addNotificationEmails(json).then((result)=>{
          this.response = result;
          this.systemData = this.response;
          
          if(this.systemData.status ==  'success'){
             Swal.fire(
	          'Email Added Succesfully',
	          '',
	          'success'
	        );
          }
          this.email_form.resetForm();
          this.getEmails();
      })

  }

 	onCustomAction(event) {
      switch ( event.action) {
        case 'viewrecord':
          this.viewRecord(event.data);
          break;
    }
   }


   viewRecord(formData: any) {

   	 var json = {
        "_id": formData._id,
      }
  
      this.authenticationService.deleteNotificationEmails(json).then((result)=>{
          this.response = result;
          this.systemData = this.response;
          
          if(this.systemData.status ==  'success'){
             Swal.fire(
            'Email Removed Succesfully',
            '',
            'success'
          );
          }
          this.getEmails();
        
      })
}

	deleteEmail(id){
		console.log(id);
	}

}
