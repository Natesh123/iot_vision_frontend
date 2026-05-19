import { Component, OnInit,ViewChild,TemplateRef,ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { AuthenticationService } from '../../services/index';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
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

declare var $: any;

@Component({
  selector: 'ngx-ahu',
  templateUrl: './ahu.component.html',
  styleUrls: ['./ahu.component.scss']
})
export class AhuComponent implements OnInit {

  model:any ={};
  response:any;
  dashData:any;

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
  editstatus: any = true;
  @ViewChild('dialog',{static: true}) dialog: TemplateRef<any>;

  constructor(private authenticationService: AuthenticationService,
    private chRef: ChangeDetectorRef,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService) { }

  ngOnInit() {
    this.getAHUDashData();
     var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser.user_role == 0){
      this.editstatus = false;
    }
  }

  onCloseModal(){
    document.getElementById("closeBTN").click();
  }

  editdevicePopup(device) {
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


  getAHUDashData(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    var json = {
      "user_id": currentUser._id,
    }

    this.authenticationService.getAhuDashData(json).then((result)=>{
      this.response = result;
      this.dashData = this.response.records;

      var settings = JSON.parse(localStorage.getItem('system_settings'));

      if(settings.alarm_log_status == '1'){
        for(var i = 0; i < this.dashData.length; i++){
          //Temparature
          if(this.dashData[i].device_min_temp > this.dashData[i].device_temp){
              this.storeAlaramLog(this.dashData[i].ahudevice_id,'Low Temperature',this.dashData[i].device_temp,this.dashData[i].device_humidity);
              this.alarm_beep_status = true;
          } 
          else if(this.dashData[i].device_max_temp < this.dashData[i].device_temp){
            this.storeAlaramLog(this.dashData[i].ahudevice_id,'High Temperature',this.dashData[i].device_temp,this.dashData[i].device_humidity);
            this.alarm_beep_status = true;
          } 
          //Pressure
          if(this.dashData[i].device_min_pressure > this.dashData[i].device_pressure){
            this.storeAlaramLog(this.dashData[i].ahudevice_id,'Low Pressure',this.dashData[i].device_temp,this.dashData[i].device_humidity);
            this.alarm_beep_status = true;
          } 
          else if(this.dashData[i].device_max_pressure < this.dashData[i].device_pressure){
          this.storeAlaramLog(this.dashData[i].ahudevice_id,'High Pressure',this.dashData[i].device_temp,this.dashData[i].device_humidity);
            this.alarm_beep_status = true;
          } 
          //Humidity
          if(this.dashData[i].device_min_humidity > this.dashData[i].device_humidity){
            this.storeAlaramLog(this.dashData[i].ahudevice_id,'Low Humidity',this.dashData[i].device_temp,this.dashData[i].device_humidity);
            this.alarm_beep_status = true;
          } 
          else if(this.dashData[i].device_max_humidity < this.dashData[i].device_humidity){
          this.storeAlaramLog(this.dashData[i].ahudevice_id,'High Humidity',this.dashData[i].device_temp,this.dashData[i].device_humidity);
            this.alarm_beep_status = true;
          }

        }
      }

      if(this.alarm_beep_status == true){
        this.playAudio();
      }
      

    })

  }


  updateDevicesConfValue(){
    
    var json = {
      "ahudevice_id": this.model.device_id,
      updateObj:{
          "device_min_temp": this.model.mintemp,
          "device_max_temp": this.model.maxtemp,
          "device_min_pressure": this.model.minpres,
          "device_max_pressure": this.model.maxpres,
          "device_min_humidity": this.model.minhum,
          "device_max_humidity": this.model.maxhum
        }
      };

    this.authenticationService.updateAhuDeviceConf(json).then((result)=>{
      console.log(result); 
      this.response = result;
      if(this.response.status == 'success'){
        Swal.fire(
          'Device Details Updated!',
          '',
          'success'
        );
        this.getAHUDashData();
        this.onCloseModal();
        // this.editoption = true;
        // this.updatebutton = false;
      }
    })
  }

  copyToClipboard(item) {
    var link = 'http://192.168.0.250:8081/viewahusensor.html?dev_id='+item;
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

  storeAlaramLog(device_id,msg,temp,humidity){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var json_log = {
      "ahudevice_id": device_id,
      "user_id": currentUser._id,
      "log_message": msg,
      "device_temp":temp,
      "device_humidity":humidity
      };

    this.authenticationService.storeAhuAlarmLog(json_log).then((result)=>{
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
