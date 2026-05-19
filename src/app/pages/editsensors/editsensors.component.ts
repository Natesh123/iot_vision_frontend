import { Component, OnInit,ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { AuthenticationService } from '../../services/index';
import { DatePipe, JsonPipe } from '@angular/common';
import { RemarkComponent } from '../reports/remark/remark.component';
// import { EditdetailsComponent } from './editdetails/editdetails.component';
import { AuremarkComponent } from '../reports/auremark/auremark.component';
import { RouterEvent, Router, ActivatedRoute } from '@angular/router';
import { link } from 'fs';
import { DomSanitizer } from '@angular/platform-browser';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
//import * as moment from 'moment';
import * as moment from 'moment-timezone';
import { EditmodelComponent } from './editmodel/editmodel.component';

// import {MatDialog} from '@angular/material/dialog';

// import {
//   NgbModal,
//   ModalDismissReasons,
//   NgbActiveModal
// } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-editsensors',
  templateUrl: './editsensors.component.html',
  styleUrls: ['./editsensors.component.scss']
})
export class EditsensorsComponent implements OnInit {

  alaramLog:any;
  AhualaramLog:any;
  responseSensor:any;
  sensorData:any;
  model:any={};

  settings = {

    actions: {
      delete: false,
      add: false,
      edit:false,
      position: 'right'
    },
    columns: {
      created_at: {
        title: 'Date',
        type: 'string',
        filter:false,
        valuePrepareFunction: (value) => {

         var result =  moment(value).tz('Asia/London').format('DD/MM/YYYY');
         return result;
        },
      },
      temperature:{
        title:"Temperature",
        type:'string',
        filter:false,
        valuePrepareFunction: (col,row) => {
          return row.device_temp;
         },
      },
      humidity:{
        title:"Relative Humidity",
        type:'string',
        filter:false,
        valuePrepareFunction: (col,row) => {
           if(row.device_humidity == null || row.device_humidity == undefined){
              return "-----";
          } else{
            return row.device_humidity;  
          }
         },
      },
      pressure:{
        title:"Pressure",
        type:'string',
        filter:false,
        valuePrepareFunction: (col,row) => {
           if(row.device_pressure == null || row.device_pressure == undefined){
              return "-----";
          } else{
            return row.device_pressure;  
          }
         },
      },
 
      button1: {
        title:'Action',
        type:'custom',
        filter:false,
        renderComponent: EditmodelComponent,
        onComponentInitFunction:(instance) => {
          instance.save.subscribe(row => {
            console.log(row);
            // alert(`${JSON.parse(row)} saved!`);
            this.source.refresh();
            this.getSensorDetails();
          });
        },
      }
    },
  
  };

  source: LocalDataSource = new LocalDataSource();
  // public ahusource: LocalDataSource = new LocalDataSource();



  
  response:any;
  ahuresponse:any;
  responseSensorReport:any;
  sensorReportData:any;
  responseAhu:any;
  AHUsensorData:any;
  sensor_device_name: any;
  ausensor_device_name: any;
  report_json: any;
  graphEnable: number;
  graphsensorEnable: number;
  report_json1: any;
  pdflink: any;
  pdffile: any;
  example: any;
  records: any=[];
  themeSubscription: any;
  graphData: any = [];
  tempdata: any = [];
  device_name: any;
  humiditydata: any = [];
  humdata: any;
  options1: any;
  graphType: any;
  data: any;
  options: any;
  viewhumgraph:number;
  ahu_report_view:any;
  room_id:any;
  role  :any;
  response_rm : any;
  RMdashData  : any;
  @ViewChild('content3',{static:true}) myModal;
  
  constructor(private authenticationService: AuthenticationService,
              private datePipe: DatePipe,
              private router: Router,private route: ActivatedRoute,private sanitizer: DomSanitizer,
              private theme: NbThemeService, 
            ) { }
            // private modalService: NgbModal
  ngOnInit() {
  //   if (!window.screenTop && !window.screenY) {
  //     alert('Fullscreen mode......');
  // } else{
  //   alert("Normal Mode...");
  // }

  this.room_id = localStorage.getItem('room_id');
  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  this.role = currentUser.user_role; 
  console.log("userrole",this.role)
  // if(this.room_id == 1 && this.role == 0 || this.role == 1 || this.role == 2 || this.role == 3 || this.role == 4){
  //     this.ahu_report_view = 1;
  // } else{
  //     this.ahu_report_view = 0;
  // }
  this.getAllSensor();
  // this.getDashRMData();
  }

  onCustomAction(event) {
    console.log(event.data);
    switch ( event.action) {
      case 'viewrecord':
        this.viewRequest(event.data);
        console.log(event.data);
        break;
    }
  }
  public viewRequest(data){
    // this.authenticationService.getParticularRequestlist({"id":data._id}).then((result)=>{
    //   console.log("22--",result);
    //   this.cancelledlist = result;
    // })
    // this.modalService.open( this.myModal, { size: 'md' });
  }

  getAllSensor(){
    this.authenticationService.getAllSensor().then((result)=>{
      this.responseSensor = result;
      this.sensorData = this.responseSensor.records;
      console.log("sensorData",this.sensorData)
    })

  }



  getSensorDetails(){
  
    var date = this.datePipe.transform(this.model.choosedDate, 'yyyy-MM-dd');
    console.log("date",date)
    // var endDate = this.datePipe.transform(this.model.choosedDate.end, 'yyyy-MM-dd');
    this.sensor_device_name = this.model.device_id.device_name;

    this.report_json = {
      "date":date,
      "device_id":this.model.device_id.device_id
    }
    console.log("reportjson",this.report_json )
    this.authenticationService.getIndSensor(this.report_json).then((result)=>{
      this.response_rm = result;
        this.RMdashData = this.response_rm.records;
        this.source = new LocalDataSource(this.RMdashData);
        console.log(" IndsensorData ", this.RMdashData )
    })
    
  }
}



