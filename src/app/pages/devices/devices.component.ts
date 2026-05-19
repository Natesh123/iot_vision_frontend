import { Component, OnInit,ViewChild,TemplateRef,ChangeDetectorRef } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { AuthenticationService } from '../../services/index';
import Swal from 'sweetalert2'

declare var $: any;

@Component({
  selector: 'ngx-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  @ViewChild('dialog',{static: true}) dialog: TemplateRef<any>;
  @ViewChild('updatedialog',{static: true}) updatedialog: TemplateRef<any>;
  @ViewChild('assigndialog',{static: true}) assigndialog: TemplateRef<any>;
  devices:any;
  devi_tmp:any; 
  model: any = {};
  response:any;
  editoption:any = true;
  updatebutton:any = false;
  update_dev_temp: any;
  update_dev: any;
  asset_tmp: any;
  assets: any;
  constructor(private dialogService: NbDialogService,
    private authenticationService: AuthenticationService,
    private chRef: ChangeDetectorRef) {

}


  ngOnInit() {
    this.getDevices('all');
  }

  onCloseModal(){
    this.editoption = true;
    this.updatebutton = false;
    document.getElementById("closeBTN").click();
   }

  adddevicePopup() {
    const dialogRef = this.dialogService.open(
      this.dialog,
      {
        context: '',
        closeOnEsc: false,
      });
  }

  updateDevicePopup(id) {
    this.getDevices(id);
    const dialogRef = this.dialogService.open(
      this.updatedialog,
      {
        context: '',
        closeOnEsc: false,
      });
  }

  openAssetAssign(dev_id){
    this.getAssets(dev_id);
    const dialogRef = this.dialogService.open(
      this.assigndialog,
      {
        context: '',
        closeOnEsc: false,
      });
  }


  getAssets(dev_id){
    this.model.assign_device_id = dev_id;
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var json =  {"user_id": currentUser._id};
    this.authenticationService.getAssets(json).then((result)=>{
      console.log(result); 
      this.asset_tmp = result;
      this.assets = this.asset_tmp.records;
    })
  }


  getDevices(type){

    if(type == 'all'){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var json =  {"user_id": currentUser._id};
    this.authenticationService.getDevices(json).then((result)=>{
      console.log(result); 
      this.devi_tmp = result;
      this.devices = this.devi_tmp.records;
    })
  } else{
    var json1 =  {"_id": type};
        this.authenticationService.getDevices(json1).then((result)=>{
        console.log(result); 
        this.update_dev_temp = result;
        this.update_dev = this.update_dev_temp.records[0];
        this.chRef.detectChanges();  
        this.model.update_dev_id = type;
        this.model.update_name = this.update_dev.name
        this.model.update_device_type = this.update_dev.device_type
        this.model.update_label = this.update_dev.label
        this.model.update_description = this.update_dev.description
      })
    }
}


  async deleteDevices(devi_id,devi_name){

    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to delete the Device - '+ devi_name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        var json =  {"_id": devi_id};
        this.authenticationService.deleteDevices(json).then((result)=>{
          Swal.fire(
            'Deleted!',
            '',
            'success'
          )
          this.getDevices('all');
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

  addDevices(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var json = {
          "name": this.model.name,
          "device_type": this.model.device_type,
          "label": this.model.label,
          "description": this.model.description,
          "user_id": currentUser._id
      };

    this.authenticationService.addDevices(json).then((result)=>{
      console.log(result); 
      this.response = result;
      if(this.response.status == 'success'){
        this.getDevices('all');
      }
    })
  }


  editDev(){
    this.editoption = false;
    this.updatebutton = true;
  }
  cancelEdit(){
    this.editoption = true;
    this.updatebutton = false;
  }
  
  updateDevicesValue(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var json = {
      "_id": this.model.update_dev_id,
      updateObj:{
          "name": this.model.update_name,
          "device_type": this.model.update_device_type,
          "label": this.model.update_label,
          "description": this.model.update_description,
        }
      };

    this.authenticationService.updateDevices(json).then((result)=>{
      console.log(result); 
      this.response = result;
      if(this.response.status == 'success'){
        Swal.fire(
          'Device Details Updated!',
          '',
          'success'
        );
        this.getDevices('all');
        // this.editoption = true;
        // this.updatebutton = false;
      }
    })
  }

  AssignDevice(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    var json = {
      "user_id": currentUser._id,
      "asset_id": this.model.res,
      "device_id": this.model.assign_device_id
    }

    this.authenticationService.userAssign(json).then((result)=>{
      console.log(result); 
      this.response = result;
      if(this.response.status == 'success'){
        Swal.fire(
          'Assign Successfully!',
          '',
          'success'
        );
        this.getDevices('all');
        // this.editoption = true;
        // this.updatebutton = false;
      }
    })

  }
  
}
