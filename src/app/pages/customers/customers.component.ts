import { Component, OnInit,ViewChild,TemplateRef,ChangeDetectorRef} from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { AuthenticationService } from '../../services/index';
import Swal from 'sweetalert2'

@Component({
  selector: 'ngx-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  @ViewChild('dialog',{static: true}) dialog: TemplateRef<any>;
  @ViewChild('updatedialog',{static: true}) updatedialog: TemplateRef<any>;

  customer:any;
  update_customer:any;
  cus_temp:any;
  update_cus_temp:any;
  model: any = {};
  response:any;
  editoption:any = true;
  updatebutton:any = false;
  constructor(private dialogService: NbDialogService,
              private authenticationService: AuthenticationService,
              private chRef: ChangeDetectorRef) {
   
   }

  ngOnInit() {
    this.getCustomer('all');
  }

  onCloseModal(){
    this.editoption = true;
    this.updatebutton = false;
    document.getElementById("closeBTN").click();
   }

  addCustomerPopup() {
    const dialogRef = this.dialogService.open(
      this.dialog,
      {
        context: '',
        closeOnEsc: false,
      });
  }

  updateCustomerPopup(id) {
    this.getCustomer(id);
    const dialogRef = this.dialogService.open(
      this.updatedialog,
      {
        context: '',
        closeOnEsc: false,
      });
  }

  getCustomer(type){
   
    if(type == 'all'){
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var json =  {"user_id": currentUser._id};
        this.authenticationService.getCustomer(json).then((result)=>{
          console.log(result); 
          this.cus_temp = result;
          this.customer = this.cus_temp.records;
        })
    } else{
      var json1 =  {"_id": type};
        this.authenticationService.getCustomer(json1).then((result)=>{
        console.log(result); 
        this.update_cus_temp = result;
        this.update_customer = this.update_cus_temp.records[0];
        this.chRef.detectChanges();
        this.model.update_title = this.update_customer.title;
        this.model.update_desc = this.update_customer.description;
        this.model.update_country = this.update_customer.country;
        this.model.update_city = this.update_customer.city;
        this.model.update_state = this.update_customer.state;
        this.model.update_postal_code = this.update_customer.postal_code;
        this.model.update_address1 = this.update_customer.address1;
        this.model.update_address2 = this.update_customer.address2;
        this.model.update_email = this.update_customer.email;
        this.model.update_phone = this.update_customer.mobilenumber;
        this.model.update_custo_id = this.update_customer._id;
      })
    }
  }


  async deleteCustomer(cust_id,cust_name){

    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to delete the customer - '+ cust_name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        var json =  {"_id": cust_id};
        this.authenticationService.deleteCustomer(json).then((result)=>{
          Swal.fire(
            'Deleted!',
            '',
            'success'
          )
          this.getCustomer('all');
        })
       
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          '',
          'error'
        )
      }
    });

   
  }

  addCustomer(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var json = {
          "title": this.model.title,
          "description": this.model.desc,
          "country": this.model.country,
          "city": this.model.city,
          "state": this.model.state,
          "postal_code": this.model.postal_code,
          "address1": this.model.address1,
          "address2": this.model.address2,
          "email": this.model.email,
          "mobilenumber": this.model.phone,
          "user_id": currentUser._id
      };

    this.authenticationService.addCustomer(json).then((result)=>{
      console.log(result); 
      this.response = result;
      if(this.response.status == 'success'){
        this.onCloseModal();
        Swal.fire(
          'Customer Added Successfully!',
          '',
          'success'
        )
        this.getCustomer('all');
      }
    })
  }

  editCust(){
    this.editoption = false;
    this.updatebutton = true;
  }
  cancelEdit(){
    this.editoption = true;
    this.updatebutton = false;
  }
  
  updateCustomer(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var json = {
      "_id": this.model.update_custo_id,
      updateObj:{
          "title": this.model.update_title,
          "description": this.model.update_desc,
          "country": this.model.update_country,
          "city": this.model.update_city,
          "state": this.model.update_state,
          "postal_code": this.model.update_postal_code,
          "address1": this.model.update_address1,
          "address2": this.model.update_address2,
          "email": this.model.update_email,
          "mobilenumber": this.model.update_phone
        }
      };

    this.authenticationService.updateCustomer(json).then((result)=>{
      console.log(result); 
      this.response = result;
      if(this.response.status == 'success'){
        Swal.fire(
          'Customer Details Updated!',
          '',
          'success'
        );
        // this.editoption = true;
        // this.updatebutton = false;
        this.getCustomer('all');
      }
    })
  }
  

}
