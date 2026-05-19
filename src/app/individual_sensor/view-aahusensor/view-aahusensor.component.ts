import { Component, OnInit,ViewChild,TemplateRef,ChangeDetectorRef, AfterViewInit,Input,OnDestroy } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { AuthenticationService } from '../../services/index';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { NbThemeService } from '@nebular/theme';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ngx-view-aahusensor',
  templateUrl: './view-aahusensor.component.html',
  styleUrls: ['./view-aahusensor.component.scss']
})
export class ViewAahusensorComponent implements OnInit {

  model:any ={};
  param1: string;
  param2: string;
  response: any;
  deviceData: any;
  responselog:any;
  alarmLog:any;
  today: number = Date.now();
  constructor(private theme: NbThemeService,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private chRef: ChangeDetectorRef) { 
    console.log('Called Constructor');
    this.route.queryParams.subscribe(params => {
        this.param1 = params['dev_id'];
    });

    setInterval(() => {
      this.getDeviceData();
      this.getDeviceAlaramLog();
    }, 900000);

    setInterval(() => {this.today = Date.now()}, 1);
  }

  ngOnInit() {
    this.getDeviceData();
    this.getDeviceAlaramLog();
  }

  getDeviceData(){

    var json = {
      "ahudevice_id": this.param1
    }

    this.authenticationService.getAhuDeviceData(json).then((result)=>{
      console.log(result); 
      this.response = result;
      this.deviceData = this.response.records[0];
    })

  }


  getDeviceAlaramLog(){

    var json = {
      "device_id": this.param1
    }

    this.authenticationService.getDeviceAlaramLog(json).then((result)=>{
      console.log(result); 
      this.responselog = result;
      this.alarmLog = this.responselog.records;
    })

  }

 


}
