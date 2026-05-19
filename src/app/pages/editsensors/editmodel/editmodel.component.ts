import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation, TemplateRef, ViewChild } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { AuthenticationService } from '../../../services/index';
import * as $ from "jquery"
// import {EditsensorsComponent} from '../editsensors.component';

@Component({
  template: `
  <button class="btn btn-outline-success"  style=" width: 100%; height: 100%;" id="button" (click)="onClick()" nbButton>Edit</button>
 
 
  <ng-template #dialog let-data let-ref="dialogRef">
  <nb-card class=add-widget>
    <nb-card-header>Edit Details
      <nb-icon class="icon-set" style="float: right" id="closeBTN" (click)="ref.close()" icon="close-outline" status="warning"></nb-icon>
    </nb-card-header>
    <nb-card-body>
    <form class="register-form" name="form" (ngSubmit)="form.form.valid && remark()" #form="ngForm" novalidate class="form">
    <div class="form-group">
  
      <div class="form-group"  [ngClass]="{ 'has-error': form.submitted && !device_temp.valid }">
        <p class="col-sm-12">Temperature</p>
            <input class="text" type="text"  name="device_temp" value = "data.temp" [(ngModel)]="model.device_temp" #device_temp="ngModel" required />
     </div>

        <div *ngIf="form.submitted && !device_temp.valid" class="alert-warning">Enter Temperature</div>
     <div class="form-group"  [ngClass]="{ 'has-error': form.submitted && !device_humidity.valid }">
       <p class="col-sm-12">Humidity</p>
        <input class="text" type="text"  name="device_humidity" value = "data.temp" [(ngModel)]="model.device_humidity" #device_humidity="ngModel" required />
    </div>

     <div *ngIf="form.submitted && !device_humidity.valid" class="alert-warning">Enter Humidity</div>

    <div class="form-group"  [ngClass]="{ 'has-error': form.submitted && !device_pressure.valid }">
      <p class="col-sm-12">Pressure</p>
    <input class="text" type="text"  name="device_pressure" value = "data.temp" [(ngModel)]="model.device_pressure" #device_pressure="ngModel" required />
   </div>

   <div *ngIf="form.submitted && !device_pressure.valid" class="alert-warning">Enter Pressure</div>
    </div>
 
    <div class="form-group form-button">
        <button type="submit" class="btn btn-outline-success" nbButton>Submit</button>
    </div>
</form>
    </nb-card-body>
  </nb-card>
</ng-template>
  `,
  styleUrls: ['./editmodel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // providers : [EditsensorsComponent]
 
})
export class EditmodelComponent implements OnInit {

  renderValue: any;
  model: any = {};
  remarkData: any;
  loadData: any;
  remarkData1: any;
  device_temp: any;
  device_humidity: any;
  device_pressure: any;
  res : any = [];
  constructor(private dialogService: NbDialogService,
    private authenticationService: AuthenticationService){}
    
  @ViewChild('dialog',{static: true}) dialog: TemplateRef<any>;
  
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    console.log("rowdata",this.rowData)
    this.device_temp = this.rowData.device_temp;
    this.device_humidity = this.rowData.device_humidity;
    this.device_pressure = this.rowData.device_pressure;
    // if(this.rowData.remark!=undefined){
    //   this.renderValue = this.value;
    // }
    console.log("device_temp",  this.device_temp);
    console.log("device_humidity",this.rowData.device_humidity);
    console.log("device_pressure",this.rowData.device_pressure);

    
  }

  onClick() {
    this.save.emit(this.rowData);
    console.log("dialogdata",this.rowData);
    this.device_temp = this.rowData.device_temp;
    this.device_humidity = this.rowData.device_humidity;
    this.device_pressure = this.rowData.device_pressure;
    var data = {
      "temp" : this.device_temp,
      "humidity" : this.device_humidity,
      "pressure" : this.device_pressure
    }
    this.dialogBox(data);
  }
  
  dialogBox(data){
    this.dialogService.open( this.dialog,{context:data,closeOnEsc: false});
    this.model.device_temp = data.temp;
    this.model.device_humidity = data.humidity;
    this.model.device_pressure = data.pressure;
  }
  onCloseModal(){
    document.getElementById("closeBTN").click();
  }
  remark(){
    console.log(this.model.device_temp);
    console.log(this.model.device_humidity);
    console.log(this.model.device_pressure);
    console.log(this.rowData);

    var json = {
      "id":this.rowData._id,
      "device_id":this.rowData.device_id,
      "updateObj":{
    
        "device_temp":this.model.device_temp,
        "device_humidity":this.model.device_humidity,
        "device_pressure":this.model.device_pressure
      }
    }
console.log("json",json)
    this.authenticationService.updateSensorDetails(json).then((result)=>{
      console.log("result",result); 
      this.res = result;
      if(this.res.status == "success"){
        this.onCloseModal();
        // this.editcensor.getSensorDetails();
        this.save.emit(this.rowData);
      }
 
    })
  }


}

