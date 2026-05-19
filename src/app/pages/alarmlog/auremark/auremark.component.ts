import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation, TemplateRef, ViewChild } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { AuthenticationService } from '../../../services/index';
import * as $ from "jquery"

@Component({
  template: `
  <button class="btn btn-outline-success" *ngIf="!renderValue" style=" width: 100%; height: 100%;" id="button" (click)="onClick()" nbButton>Edit Remark</button>
  <p id="data" *ngIf="renderValue">{{renderValue}}</p>
 
  <ng-template #dialog let-data let-ref="dialogRef">
  <nb-card class=add-widget>
    <nb-card-header>Edit Remarks
      <nb-icon class="icon-set" style="float: right" id="closeBTN" (click)="ref.close()" icon="close-outline" status="warning"></nb-icon>
    </nb-card-header>
    <nb-card-body>
    <form class="register-form" name="form" (ngSubmit)="form.form.valid && remark()" #form="ngForm" novalidate class="form">
    <div class="form-group">
        <div class="form-group"  [ngClass]="{ 'has-error': form.submitted && !remark_name.valid }">
            <input class="text" type="text"  name="remark_name" [(ngModel)]="model.remark_name" #remark_name="ngModel" required placeholder="Enter Remark"/>
        </div>
    </div>
    <div *ngIf="form.submitted && !remark_name.valid" class="alert-warning">Enter Remark</div>
    <div class="form-group form-button">
        <button type="submit" class="btn btn-outline-success" nbButton>Submit</button>
    </div>
</form>
    </nb-card-body>
  </nb-card>
</ng-template>
  `,
  styleUrls: ['./auremark.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuremarkComponent implements OnInit {
  renderValue: any;
  model: any = {};
  remarkData: any;
  loadData: any;
  remarkData1: any;
  remark_data: any;
  auth_remark: any;
  isLoad: boolean;
  data: any;

  constructor(private dialogService: NbDialogService,
    private authenticationService: AuthenticationService,){}
  @ViewChild('dialog',{static: true}) dialog: TemplateRef<any>;
  
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value;
    console.log(this.renderValue);
    console.log("info",this.rowData);
    // this.dataload();
    console.log(this.remark_data);
  }

  onClick() {
    // this.save.emit(this.rowData);
    // console.log("data",this.rowData);
    this.dialogBox();
  }

  dialogBox(){
    this.dialogService.open(
      this.dialog,
      {
        context: '',
        closeOnEsc: false,
      });
  }
  onCloseModal(){
    document.getElementById("closeBTN").click();
  }
  remark(){
    console.log(this.model.remark_name);
    console.log(this.rowData);

    var json = {
      "_id":this.rowData._id,
      "updateObj":{
        "remark":this.model.remark_name,
      }
    }

    this.authenticationService.updateAHUDeviceTempLog(json).then((result)=>{
      this.data = result;
      if(this.data.status="success"){
      this.remarkData1 = this.model.remark_name;
      this.onCloseModal();
      this.rowData.remark=this.remarkData1;
      this.save.emit(this.rowData);
      }
    })
  }
}