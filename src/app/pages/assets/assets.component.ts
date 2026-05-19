import { Component, OnInit,ViewChild,TemplateRef,ChangeDetectorRef } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { AuthenticationService } from '../../services/index';
import Swal from 'sweetalert2'

@Component({
  selector: 'ngx-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  @ViewChild('dialog',{static: true}) dialog: TemplateRef<any>;
  @ViewChild('updatedialog',{static: true}) updatedialog: TemplateRef<any>;
  assets:any;
  asset_tmp:any; 
  model: any = {};
  response:any;
  editoption:any = true;
  updatebutton:any = false;
  update_ass_temp: any;
  update_ass: any;
  constructor(private dialogService: NbDialogService,
    private authenticationService: AuthenticationService,
    private chRef: ChangeDetectorRef) {

}

  ngOnInit() {
    this.getAssets('all');
  }

  onCloseModal(){
    this.editoption = true;
    this.updatebutton = false;
    document.getElementById("closeBTN").click();
   }


  addassetsPopup() {
    const dialogRef = this.dialogService.open(
      this.dialog,
      {
        context: '',
        closeOnEsc: false,
      });
  }


  updateAssetPopup(id) {
    this.getAssets(id);
    const dialogRef = this.dialogService.open(
      this.updatedialog,
      {
        context: '',
        closeOnEsc: false,
      });
  }


  getAssets(type){

    if(type == 'all'){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var json =  {"user_id": currentUser._id};
    this.authenticationService.getAssets(json).then((result)=>{
      console.log(result); 
      this.asset_tmp = result;
      this.assets = this.asset_tmp.records;
    })
  } else{
    var json1 =  {"_id": type};
        this.authenticationService.getAssets(json1).then((result)=>{
        console.log(result); 
        this.update_ass_temp = result;
        this.update_ass = this.update_ass_temp.records[0];
        this.chRef.detectChanges();  
        this.model.update_ass_id = type;
        this.model.update_name = this.update_ass.name
        this.model.update_asset_type = this.update_ass.asset_type
        this.model.update_description = this.update_ass.description
      })
    }
  }


  async deleteAssets(asset_id,asset_name){

    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to delete the Asset - '+ asset_name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        var json =  {"_id": asset_id};
        this.authenticationService.deleteAssets(json).then((result)=>{
          Swal.fire(
            'Deleted!',
            '',
            'success'
          )
          this.getAssets('all');
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

  addAssets(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var json = {
          "name": this.model.name,
          "asset_type": this.model.asset_type,
          "description": this.model.description,
          "user_id": currentUser._id
      };

    this.authenticationService.addAssets(json).then((result)=>{
      console.log(result); 
      this.response = result;
      if(this.response.status == 'success'){
        this.getAssets('all');
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
  
  updateAssetValue(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var json = {
      "_id": this.model.update_ass_id,
      updateObj:{
          "name": this.model.update_name,
          "asset_type": this.model.update_asset_type,
          "description": this.model.update_description,
        }
      };

    this.authenticationService.updateAssets(json).then((result)=>{
      console.log(result); 
      this.response = result;
      if(this.response.status == 'success'){
        Swal.fire(
          'Asset Details Updated!',
          '',
          'success'
        );
        this.getAssets('all');
        // this.editoption = true;
        // this.updatebutton = false;
      }
    })
  }
  

}
