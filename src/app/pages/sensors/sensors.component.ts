import { Component, OnInit,ViewChild,TemplateRef,ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { AuthenticationService } from '../../services/index';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToasterConfig } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import { parse } from 'url';
import { Router } from '@angular/router';

declare var $: any;


@Component({
  selector: 'ngx-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit, AfterViewInit {

  asset_tmp:any;
  assets:any;
  response:any;
  dashData:any;
  model:any ={};
  activestatus:any = true;
  response_rm:any;
  RMdashData:any;
  response_gs:any;
  GoodStoredashData:any;
  response_ld:any;
  LiquiddashData:any;
  response_om:any;
  OinmnetdashData:any;
  response_ta:any;
  TabAreadashData:any;
  response_pg:any;
  PackingdashData:any;
  response_fg:any;
  FillingdashData:any;
  response_pp:any;
  PriPackdashData:any;
  TabletdashData:any;
  InjdashData:any;
  DropdashData:any;
  response_cr:any;
  ChangeRoomdashData:any;


  config: ToasterConfig;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'success';
  alarm_status = true;
  alarm_beep_status = false;
  title = 'Link Copied Succesfully !';
  content = ``;
  room_id:any;
  partials : any = 0;
  @ViewChild('dialog',{static: true}) dialog: TemplateRef<any>;
  RMcorridor: any;
  pressureDiff: any=[];
  RMpressureDiff: any=[];
  Liquidcorridor: any;
  LiquidpressureDiff: any=[];
  OinmnetpressureDiff: any=[];
  Oinmnetcorridor: any;
  tabAreacorridor: any;
  TabAreapressureDiff: any=[];
  packingcorridor: any;
  PackingpressureDiff: any=[];
  pripackcorridor: any;
  PripackpressureDiff: any=[];
  DashpressureDiff: any=[];
  airlockcorridor: any;
  json: any;
  editstatus: any = true;

  constructor(private authenticationService: AuthenticationService,
              private chRef: ChangeDetectorRef,
              private dialogService: NbDialogService,
              private toastrService: NbToastrService,
              private router: Router,
              private http: HttpClient) { 

        setInterval(() => {
          this.getDashData();
            if(localStorage.getItem('room_id') == '1'){
            this.getDatawithGroup('1');
            this.getDatawithGroup('2');
            this.getDatawithGroup('3');
            this.getDatawithGroup('4');
            this.getDatawithGroup('5');
            this.getDatawithGroup('6');
            this.getDatawithGroup('7');
            this.getDatawithGroup('8');
            this.getDatawithGroup('9');

          }
        }, 900000);
    }

  ngOnInit() {
    this.room_id = localStorage.getItem('room_id');
    this.getDashData();
    this.getDashDataUnitI('1');
    this.getDashDataUnitI('2');
    this.getDashDataUnitI('3');
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser.user_role == 0 || currentUser.user_role == 2 || currentUser.user_role == 3 || currentUser.user_role == 4){
      this.editstatus = false;
    }
    if(localStorage.getItem('room_id') == '1'){
      this.getDatawithGroup('1');
      this.getDatawithGroup('2');
      this.getDatawithGroup('3');
      this.getDatawithGroup('4');
      this.getDatawithGroup('5');
      this.getDatawithGroup('6');
      this.getDatawithGroup('7');
      this.getDatawithGroup('8');
      this.getDatawithGroup('9');

    }

  } 

  ngAfterViewInit(){
   
  }


  onCloseModal(){
    document.getElementById("closeBTN").click();
  }

  editdevicePopup(device,type =0) {
    this.partials = type;
    this.model.device_id = device.device_id;
    this.model.mintemp = device.device_min_temp;
    this.model.maxtemp = device.device_max_temp;
    this.model.minpres = device.device_min_pressure;
    this.model.maxpres = device.device_max_pressure;
    this.model.minhum = device.device_min_humidity;
    this.model.maxhum = device.device_max_humidity;
    const dialogRef = this.dialogService.open(
      this.dialog,
      {
        context: '',
        closeOnEsc: false,
      });
  }

  getDatawithGroup(group_id){

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    var json = {
      "user_id": currentUser._id,
      "room_id": localStorage.getItem('room_id'), 
      "group_id" : group_id
    }

    this.authenticationService.getDashData(json).then((result: any)=>{
      if(group_id == '1'){
        this.response_rm = result;
        this.RMdashData = this.response_rm.records;
        if(this.RMdashData.length != 0){
          for(var i=0;i<this.RMdashData.length;i++){
            if(this.RMdashData[i].device_name =='RM-DISPENSING CORRIDOR'){
              this.RMcorridor = this.RMdashData[i].device_pressure;
            }
          }
        }
        for(var i=0;i<this.RMdashData.length;i++){
          // if(this.RMdashData[i].device_id != 7){
            this.RMpressureDiff.push(Math.abs(this.RMdashData[i].device_pressure - this.RMcorridor));
          // }
        }
      } else if(group_id == '2'){
        this.response_gs = result;
        this.GoodStoredashData = this.response_gs.records;
      } else if(group_id == '3'){
        this.response_ld = result;
        this.LiquiddashData = this.response_ld.records;
        if(this.LiquiddashData.length != 0){
          for(var i=0;i<this.LiquiddashData.length;i++){
            if(this.LiquiddashData[i].device_name =='LIQUID CORRIDOR'){
              this.Liquidcorridor = this.LiquiddashData[i].device_pressure;
            }
          }
        }
        for(var i=0;i<this.LiquiddashData.length;i++){
          // if(this.LiquiddashData[i].device_id != 7){
            this.LiquidpressureDiff.push(Math.abs(this.LiquiddashData[i].device_pressure - this.Liquidcorridor));
          // }
        }
      } else if(group_id == '4'){
        this.response_om = result;
        this.OinmnetdashData = this.response_om.records;
        if(this.OinmnetdashData.length != 0){
          for(var i=0;i<this.OinmnetdashData.length;i++){
            if(this.OinmnetdashData[i].device_name =='OINTMENT CORRIDOR'){
              this.Oinmnetcorridor = this.OinmnetdashData[i].device_pressure;
            }
          }
        }
        for(var i=0;i<this.OinmnetdashData.length;i++){
          // if(this.OinmnetdashData[i].device_id != 7){
            this.OinmnetpressureDiff.push(Math.abs(this.OinmnetdashData[i].device_pressure - this.Oinmnetcorridor));
          // }
        }
      } else if(group_id == '5'){
        this.response_ta = result;
        this.TabAreadashData = this.response_ta.records;
        if(this.TabAreadashData.length != 0){
          for(var i=0;i<this.TabAreadashData.length;i++){
            if(this.TabAreadashData[i].device_name =='TABLET CORRIDOR'){
              this.tabAreacorridor = this.TabAreadashData[i].device_pressure;
            }
          }
        }
        for(var i=0;i<this.TabAreadashData.length;i++){
          // if(this.TabAreadashData[i].device_id != 7){
            this.TabAreapressureDiff.push(Math.abs(this.TabAreadashData[i].device_pressure - this.tabAreacorridor));
          // }
        }
      } else if(group_id == '6'){
        this.response_pg = result;
        this.PackingdashData = this.response_pg.records;
        if(this.PackingdashData.length != 0){
          for(var i=0;i<this.PackingdashData.length;i++){
            if(this.PackingdashData[i].device_name =='PACKING CORRIDOR'){
              this.packingcorridor = this.PackingdashData[i].device_pressure;
            }
          }
        }
        for(var i=0;i<this.PackingdashData.length;i++){
          // if(this.PackingdashData[i].device_id != 7){
            this.PackingpressureDiff.push(Math.abs(this.PackingdashData[i].device_pressure - this.packingcorridor));
          // }
        }
      } else if(group_id == '7'){
        this.response_fg = result;
        this.FillingdashData = this.response_fg.records;
      } else if(group_id == '8'){
        this.response_pp = result;
        this.PriPackdashData = this.response_pp.records;
        if(this.PriPackdashData.length != 0){
          for(var i=0;i<this.PriPackdashData.length;i++){
            if(this.PriPackdashData[i].device_name =='STORE CORRIDOR'){
              this.pripackcorridor = this.PriPackdashData[i].device_pressure;
            }
          }
        }
        for(var i=0;i<this.PriPackdashData.length;i++){
          // if(this.PriPackdashData[i].device_id != 7){
            this.PripackpressureDiff.push(Math.abs(this.PriPackdashData[i].device_pressure - this.pripackcorridor));
          // }
        }
      } else if(group_id == '9'){
        this.response_cr = result;
        this.ChangeRoomdashData = this.response_cr.records;
      }
      this.checkAlarms(result.records);
    })
  }

  getDashData(){

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    var json = {
      "user_id": currentUser._id,
      "room_id": localStorage.getItem('room_id'), 
      "group_id" : "0"
    }

    
    this.authenticationService.getDashData(json).then((result: any)=>{
      this.response = result;
      this.dashData = this.response.records;
      console.log(this.dashData);
      if(this.dashData.length != 0){
        for(var i=0;i<this.dashData.length;i++){
          if(this.dashData[i].device_id =='79'){
            this.airlockcorridor = this.dashData[i].device_pressure;
          }
        }
      }
      for(var i=0;i<this.dashData.length;i++){
        // if(this.dashData[i].device_id != 7){
          this.DashpressureDiff.push(Math.abs(this.dashData[i].device_pressure - this.airlockcorridor));
        // }
      }
      
      this.checkAlarms(this.dashData);

    })

  }

  checkAlarms(data) {
    if (!data || data.length == 0) return;

    var settings = JSON.parse(localStorage.getItem('system_settings'));
    this.alarm_beep_status = false;

    if (settings && settings.alarm_log_status == '1') {
      for (var i = 0; i < data.length; i++) {
        let device = data[i];
        let temp = parseFloat(device.device_temp);
        let minTemp = parseFloat(device.device_min_temp);
        let maxTemp = parseFloat(device.device_max_temp);
        let humidity = parseFloat(device.device_humidity);
        let minHum = parseFloat(device.device_min_humidity);
        let maxHum = parseFloat(device.device_max_humidity);
        let pressure = parseFloat(device.device_pressure);
        let minPres = parseFloat(device.device_min_pressure);
        let maxPres = parseFloat(device.device_max_pressure);

        // Temperature
        if (minTemp > temp && temp != 0) {
          this.storeAlaramLog(device.device_id, 'Low Temperature', temp, humidity, pressure);
          this.alarm_beep_status = true;
        }
        else if (maxTemp < temp && temp != 0) {
          this.storeAlaramLog(device.device_id, 'High Temperature', temp, humidity, pressure);
          this.alarm_beep_status = true;
        }

        // Pressure
        if (minPres > pressure && pressure != 0) {
          this.storeAlaramLog(device.device_id, 'Low Pressure', temp, humidity, pressure);
          this.alarm_beep_status = true;
        }
        else if (maxPres < pressure && pressure != 0) {
          this.storeAlaramLog(device.device_id, 'High Pressure', temp, humidity, pressure);
          this.alarm_beep_status = true;
        }

        // Humidity
        if (minHum > humidity && humidity != 0) {
          this.storeAlaramLog(device.device_id, 'Low Humidity', temp, humidity, pressure);
          this.alarm_beep_status = true;
        }
        else if (maxHum < humidity && humidity != 0) {
          this.storeAlaramLog(device.device_id, 'High Humidity', temp, humidity, pressure);
          this.alarm_beep_status = true;
        }
      }
    }

    if (this.alarm_beep_status == true) {
      this.playAudio();
    }
  }

   getDashDataUnitI(group_id){

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    var json = {
      "user_id": currentUser._id,
      "room_id": localStorage.getItem('room_id'), 
      "group_id" : group_id
    }

    
    this.authenticationService.getDashData(json).then((result: any)=>{
      this.response = result;

      if(group_id == '1'){
        this.TabletdashData = this.response.records;
      }else if(group_id == '2'){
        this.InjdashData = this.response.records;
      }else{  
        this.DropdashData = this.response.records;
      }
      this.checkAlarms(this.response.records);
      
          

    })

  }

  setActive(val){
    console.log("callled");
    this.chRef.detectChanges();
    this.activestatus = false;
  }
  sensorview(id,name){
    console.log(id);
    this.json={
      "id":id,
      "device_name":name
    }
    localStorage.setItem("sensorview",JSON.stringify(this.json));
    this.router.navigate(['/pages/sensorview']);
  }

  updateDevicesConfValue(){
    
    var json = {
      "device_id": this.model.device_id,
      updateObj:{
          "device_min_temp": this.model.mintemp,
          "device_max_temp": this.model.maxtemp,
          "device_min_pressure": this.model.minpres,
          "device_max_pressure": this.model.maxpres,
          "device_min_humidity": this.model.minhum,
          "device_max_humidity": this.model.maxhum
        }
      };

    this.authenticationService.updateDeviceConf(json).then((result)=>{
      console.log(result); 
      this.response = result;
      if(this.response.status == 'success'){
        Swal.fire(
          'Device Details Updated!',
          '',
          'success'
        );
        this.ngOnInit();
        this.onCloseModal();
        // this.editoption = true;
        // this.updatebutton = false;
      }
    })
  }

  copyToClipboard(item) {
    var link = 'http://192.168.0.250:8081/viewsensor.html?dev_id='+item;
    this.showToast(this.status, this.title, this.content);
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (link));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

  storeAlaramLog(device_id,msg,temp,humidity,pressure){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var json_log = {
      "device_id": device_id,
      "user_id": currentUser._id,
      "log_message": msg,
      "device_temp":temp,
      "device_humidity":humidity,
      "device_pressure":pressure
      };

    this.authenticationService.storeAlarmLog(json_log).then((result)=>{
      console.log(result); 
      this.response = result;
      if(this.response.status == 'success'){
        
      }
    })
  }


  playAudio(){
    let audio = new Audio();
    audio.src = "../../../assets/sound/alarm.wav";
    audio.load();
    audio.play();
  }

  intConversion(val){
    return parseInt(val);
  }

}
