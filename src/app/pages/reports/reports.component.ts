import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { AuthenticationService } from '../../services/index';
import { DatePipe, JsonPipe } from '@angular/common';
import { RemarkComponent } from '../reports/remark/remark.component';
import { AuremarkComponent } from '../reports/auremark/auremark.component';
import { RouterEvent, Router, ActivatedRoute } from '@angular/router';
import { link } from 'fs';
import { DomSanitizer } from '@angular/platform-browser';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
//import * as moment from 'moment';
import * as moment from 'moment-timezone';

@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  alaramLog:any;
  AhualaramLog:any;
  responseSensor:any;
  sensorData:any;
  particalsensorData:any;
  model:any={};
  particalmodel:any={};
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
        valuePrepareFunction: (value) => {

         var result =  moment(value).tz('Asia/London').format('DD/MM/YYYY');
         return result;
        },
      },
      created_at1: {
        title: 'Time',
        type: 'string',
        valuePrepareFunction: (col,row) => {
         return moment(row.created_at).tz('Asia/London').format('HH:mm:ss');
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
      button: {
        title: 'Remarks',
        type: 'string',
        filter:false,
        valuePrepareFunction: (col,row) => {
          return row.remark;
         },
      },
      button1: {
        title:'Action',
        type:'custom',
        filter:false,
        renderComponent: RemarkComponent,
        onComponentInitFunction:(instance) => {
          instance.save.subscribe(row => {
            console.log(row);
            // alert(`${JSON.parse(row)} saved!`);
            // this.handleUpdatedUser();
            this.source.refresh();
          });
        },
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  public particalsource: LocalDataSource = new LocalDataSource();
  public ahusource: LocalDataSource = new LocalDataSource();

  ahusettings = {

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
        valuePrepareFunction: (value) => {
         return moment(value).tz('Asia/London').format('DD/MM/YYYY');
        },
      },
      created_at1: {
        title: 'Time',
        type: 'string',
        valuePrepareFunction: (col,row) => {
         return moment(row.created_at).tz('Asia/London').format('HH:mm:ss');
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
          return row.device_humidity;
         },
      },
      button1:{
        title:"Remarks",
        type:'string',
        filter:false,
        valuePrepareFunction: (col,row) => {
          if(row.remark!=undefined){
            console.log("row Remark not");
            return row.remark;
          }
         },  
      },
      button2:{
        title:"action",
        type:'custom',
        filter:false,
        renderComponent: AuremarkComponent,
        onComponentInitFunction:(instance) => {
          instance.save.subscribe(row => {
            console.log(row);
            // alert(`${JSON.parse(row)} saved!`);
            // this.handleUpdatedUser();
            this.ahusource.refresh();
          });
        },
      }
    },
  };

  particalsettings = {

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
        valuePrepareFunction: (value) => {

         var result =  moment(value).tz('Asia/London').format('DD/MM/YYYY');
         return result;
        },
      },
      created_at1: {
        title: 'Time',
        type: 'string',
        valuePrepareFunction: (col,row) => {
         return moment(row.created_at).tz('Asia/London').format('HH:mm:ss');
        },
      },
      temperature:{
        title:"0.5 uM/Cu.M",
        type:'string',
        filter:false,
        valuePrepareFunction: (col,row) => {
          return row.device_temp +"uM/Cu.M";
         },
      },
      humidity:{
        title:"5 uM/Cu.M",
        type:'string',
        filter:false,
        valuePrepareFunction: (col,row) => {
           if(row.device_humidity == null || row.device_humidity == undefined){
              return "-----";
          } else{
            return row.device_humidity +"uM/Cu.M";  
          }
         },
      },
      button: {
        title: 'Remarks',
        type: 'string',
        filter:false,
        valuePrepareFunction: (col,row) => {
          return row.remark;
         },
      },
      button1: {
        title:'Action',
        type:'custom',
        filter:false,
        renderComponent: RemarkComponent,
        onComponentInitFunction:(instance) => {
          instance.save.subscribe(row => {
            console.log(row);
            // alert(`${JSON.parse(row)} saved!`);
            // this.handleUpdatedUser();
            this.particalsource.refresh();
          });
        },
      }
    },
  };
  response:any;
  ahuresponse:any;
  responseSensorReport:any;
  sensorReportData:any;
  responseAhu:any;
  AHUsensorData:any;
  sensor_device_name: any;
  ausensor_device_name: any;
  partical_sensor_device_name: any;
  report_json: any;
  graphEnable: number;
  graphsensorEnable: number;
  graphParticalsensorEnable: number;
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
  
  constructor(private authenticationService: AuthenticationService,
              private datePipe: DatePipe,
              private router: Router,private route: ActivatedRoute,private sanitizer: DomSanitizer,
              private theme: NbThemeService) { }

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
  if(this.room_id == 1 && this.role == 0 || this.role == 1 || this.role == 2 || this.role == 3 || this.role == 4 || this.role == 6){
      this.ahu_report_view = 1;
  } else{
      this.ahu_report_view = 0;
  }
  this.getDashData();
  this.getParticalSensor();
  this.getDashRMData();
  }

  
  getDashData(){

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    var json = {
      "user_id": currentUser._id,
      "room_id": localStorage.getItem('room_id'), 
      "group_id" : "0"
    }

    this.authenticationService.getDashData(json).then((result)=>{
      this.responseSensor = result;
      this.sensorData = this.responseSensor.records;
      console.log("sensorData",this.sensorData)
    })


    var ahujson = {
      "user_id": currentUser._id,
    }

    this.authenticationService.getAhuDashData(ahujson).then((result)=>{
      this.responseAhu = result;
      this.AHUsensorData = this.responseAhu.records;      

    })


  }
  getParticalSensor(){

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    var json = {
      "user_id": currentUser._id,
      "room_id": localStorage.getItem('room_id'), 
      "group_id" : "2"
    }
    this.particalsensorData = [];
    this.authenticationService.getDashData(json).then((result)=>{
      this.responseSensor = result;
      this.particalsensorData = this.responseSensor.records;
    })
  }
  getDashRMData(){

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    var json = {
      "user_id": currentUser._id,
      "room_id": localStorage.getItem('room_id'), 
      "group_id" : "1"
    }

    this.authenticationService.getDashData(json).then((result)=>{
      this.response_rm = result;
        this.RMdashData = this.response_rm.records;
        console.log(" RMdashData ", this.RMdashData )
    })


  }

  getSensorReport(){
    var startDate = this.datePipe.transform(this.model.choosedDate.start, 'yyyy-MM-dd');
    var endDate = this.datePipe.transform(this.model.choosedDate.end, 'yyyy-MM-dd');
    this.graphsensorEnable = undefined;
    this.sensor_device_name = this.model.device_id.device_name;
    // console.log("model devicename",this.model.device_id.device_name)
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.report_json = {
      "start_date":startDate,
      "end_date":endDate,
      "report_type":"1",
      "user_id": currentUser._id,
      "device_id":this.model.device_id.device_id
    }

    this.authenticationService.getSensorReport(this.report_json).then((result)=>{
      this.responseSensorReport = result;
      this.sensorReportData = this.responseSensorReport.records;
      this.source.load(this.sensorReportData);

      if(this.sensorReportData[0].devicedetails[0].device_id >= 70 && this.sensorReportData[0].devicedetails[0].device_id <= 78){
        this.viewhumgraph = 0;
        console.log('true')
      } else{
        this.viewhumgraph = 1;
        console.log('false')
      }

      if(this.sensorReportData.length!=0){
        this.graphsensorEnable = 1;
      }
      

      this.tempDeviceData();
    })
    
  }

  getParticalSensorReport(){
    var startDate = this.datePipe.transform(this.particalmodel.choosedDate.start, 'yyyy-MM-dd');
    var endDate = this.datePipe.transform(this.particalmodel.choosedDate.end, 'yyyy-MM-dd');
    this.graphParticalsensorEnable = undefined;
    this.partical_sensor_device_name = this.particalmodel.device_id.device_name;
    // console.log("model devicename",this.model.device_id.device_name)
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.report_json = {
      "start_date":startDate,
      "end_date":endDate,
      "report_type":"3",
      "user_id": currentUser._id,
      "device_id":this.particalmodel.device_id.device_id
    }
    let particalSensorReportData = [];
    this.authenticationService.getSensorReport(this.report_json).then((result)=>{
      this.responseSensorReport = result;
      particalSensorReportData = this.responseSensorReport.records;
      this.particalsource.load(particalSensorReportData);

      if(particalSensorReportData.length!=0){
        this.graphParticalsensorEnable = 1;
      }
      let particalgraphData = [];
      let particaltempdata = [];
      let particalhumiditydata = [];
      for(var i = 0; i < particalSensorReportData.length; i++) {
        var date = moment(particalSensorReportData[i].created_at).tz('Europe/London').format('DD/MM/YYYY HH:mm a');
        particalgraphData.push(date);
        var tempdata = particalSensorReportData[i].device_temp;
        particaltempdata.push(tempdata);
        var humiditydata = particalSensorReportData[i].device_humidity;
        particalhumiditydata.push(humiditydata);
        this.device_name = particalSensorReportData[0].devicedetails[0].device_name;
      }
      this.chartload(particalgraphData,particaltempdata);
      this.humidityChart(particalgraphData,particalhumiditydata);
    })
    
  }

  getAHUSensorReport(){
    var ahustartDate = this.datePipe.transform(this.model.ahuchoosedDate.start, 'yyyy-MM-dd');
    var ahuendDate = this.datePipe.transform(this.model.ahuchoosedDate.end, 'yyyy-MM-dd');
    
    this.ausensor_device_name = this.model.ahudevice_id.device_name;
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.report_json1 = {
      "start_date":ahustartDate,
      "end_date":ahuendDate,
      "report_type":"2",
      "user_id": currentUser._id,
      "ahudevice_id":this.model.ahudevice_id.ahudevice_id
    }

    this.authenticationService.getSensorReport(this.report_json1).then((result)=>{
      this.responseSensorReport = result;
      this.sensorReportData = this.responseSensorReport.records;
      this.ahusource.load(this.sensorReportData);
       if(this.sensorReportData.length!=0){
        this.graphEnable = 1;
      }
      this.tempDeviceData()
    })
    
  }
  viewPDF(type){
    if(type == 1){
      this.authenticationService.sensorPdfReport(this.report_json).then((result)=>{
        this.pdflink=result;
        // this.pdffile =this.sanitizer.bypassSecurityTrustResourceUrl('http://192.168.0.250:4001/file:///home/amazing/Documents/Iotvisionapi'+ this.pdflink.records);
        // this.example = 'http://192.168.0.250/file:///Iotvisionapi'+ this.pdflink.records;
        // console.log("Link",this.example);
        // window.open('/pages/pdfview','');
        var pdfdata = this.pdflink.records;
        var filename = pdfdata.split("/");
        console.log(filename[2]);
        // localStorage.setItem("pdfdata",filename[2]);
        // this.router.navigate(['/pages/pdfview']);
        var url="http://192.168.0.250:8081/serviceapi/pdfview?filename="+filename[2];
        // var url="http://localhost:4001/serviceapi/pdfview?filename="+filename[2];
        var openWindow;
        setTimeout(function() {
          openWindow = window.open(url); 
          }, 2000);
        // window.open('http://192.168.1.12:4001/serviceapi/pdfview?filename='+filename[2]);
      })
    } else if(type == 2){
      this.authenticationService.sensorPdfReport(this.report_json1).then((result)=>{
          this.pdflink=result;
        // this.pdffile =this.sanitizer.bypassSecurityTrustResourceUrl('http://192.168.0.250:4001/file:///home/amazing/Documents/Iotvisionapi'+ this.pdflink.records);
        // this.example = 'http://192.168.0.250/file:///Iotvisionapi'+ this.pdflink.records;
        // console.log("Link",this.example);
        // window.open('/pages/pdfview','');
        var pdfdata = this.pdflink.records;
        var filename = pdfdata.split("/");
        console.log(filename[2]);
        // localStorage.setItem("pdfdata",filename[2]);
        // this.router.navigate(['/pages/pdfview']);
        var url="http://192.168.0.250:8081/serviceapi/pdfview?filename="+filename[2];
        // var url="http://localhost:4001/serviceapi/pdfview?filename="+filename[2];
        var openWindow;
        setTimeout(function() {
          openWindow = window.open(url); 
          }, 3000);
        // window.open('http://192.168.1.12:4001/serviceapi/pdfview?filename='+filename[2]);
        
      })
    }else if(type == 3){
      this.authenticationService.sensorPdfReport(this.report_json).then((result)=>{
        this.pdflink=result;
        // this.pdffile =this.sanitizer.bypassSecurityTrustResourceUrl('http://192.168.0.250:4001/file:///home/amazing/Documents/Iotvisionapi'+ this.pdflink.records);
        // this.example = 'http://192.168.0.250/file:///Iotvisionapi'+ this.pdflink.records;
        // console.log("Link",this.example);
        // window.open('/pages/pdfview','');
        var pdfdata = this.pdflink.records;
        var filename = pdfdata.split("/");
        console.log(filename[2]);
        // localStorage.setItem("pdfdata",filename[2]);
        // this.router.navigate(['/pages/pdfview']);
        var url="http://192.168.0.250:8081/serviceapi/pdfview?filename="+filename[2];
        // var url="http://localhost:4001/serviceapi/pdfview?filename="+filename[2];
        var openWindow;
        setTimeout(function() {
          openWindow = window.open(url); 
          }, 2000);
        // window.open('http://192.168.1.12:4001/serviceapi/pdfview?filename='+filename[2]);
      })
    }
  }
  navigate(type){
    if(type ==1){
      console.log(this.responseSensorReport);
      localStorage.setItem("sensorReport",JSON.stringify(this.report_json));
      localStorage.setItem("graphType",type)
      console.log("hi");
      this.router.navigate(['/pages/graph']);
    }else if(type == 2){
      localStorage.setItem("sensorReport",JSON.stringify(this.report_json1));
      localStorage.setItem("graphType",type)
      this.router.navigate(['/pages/graph']);
    }
    
  }

  tempDeviceData(){
    this.graphData = [];
    this.tempdata = [];
    this.humiditydata = [];
    for(var i = 0; i < this.sensorReportData.length; i++) {
      var date = moment(this.sensorReportData[i].created_at).tz('Europe/London').format('DD/MM/YYYY HH:mm a');
      this.graphData.push(date);
      var tempdata = this.sensorReportData[i].device_temp;
      this.tempdata.push(tempdata);
      var humiditydata = this.sensorReportData[i].device_humidity;
      this.humiditydata.push(humiditydata);
      this.device_name = this.sensorReportData[0].devicedetails[0].device_name;
    }
    // this.device_name = this.sensorReportData[0].devicedetails[0].device_name;
    console.log(this.device_name);
    console.log("----------",this.graphData);
    console.log("----------",this.tempdata);
     this.chartload(this.graphData,this.tempdata);
    this.humidityChart(this.graphData,this.humiditydata);
   
  }  

  chartload(labeldata,data){
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
  
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
  
      this.data = {
        labels: labeldata,
        datasets: [{
          data: data,
          label: this.device_name,
          backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
          borderColor: colors.primary,
        }, 
        // {
        //   data: [28, 48, 40, 19, 86, 27, 90],
        //   label: 'Series B',
        //   backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
        //   borderColor: colors.danger,
        // }, {
        //   data: [18, 48, 77, 9, 115, 27, 40],
        //   label: 'Series C',
        //   backgroundColor: NbColorHelper.hexToRgbA(colors.info, 0.3),
        //   borderColor: colors.info,
        // },
        ],
      };
  
      this.options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  changeTab(){
    this.graphsensorEnable = undefined;
    this.graphEnable = undefined;
    this.graphParticalsensorEnable = undefined;
  }
  
  humidityChart(labeldata,data)
  {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
  
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
  
      this.humdata = {
        labels: labeldata,
        datasets: [{
          data: data,
          label: this.device_name,
          backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
          borderColor: colors.primary,
        }, 
        // {
        //   data: [28, 48, 40, 19, 86, 27, 90],
        //   label: 'Series B',
        //   backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
        //   borderColor: colors.danger,
        // }, {
        //   data: [18, 48, 77, 9, 115, 27, 40],
        //   label: 'Series C',
        //   backgroundColor: NbColorHelper.hexToRgbA(colors.info, 0.3),
        //   borderColor: colors.info,
        // },
        ],
      };
  
      this.options1 = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }
}
