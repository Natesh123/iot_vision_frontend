import { Component, OnInit, AfterViewInit,ViewChild,TemplateRef,ViewEncapsulation } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { AuthenticationService } from '../../services/index';
import { DatePipe } from '@angular/common';
import { RemarkComponent } from './remark/remark.component';
import { AuremarkComponent } from './auremark/auremark.component';
import { NbDialogService } from '@nebular/theme';
@Component({
  selector: 'ngx-alarmlog',
  templateUrl: './alarmlog.component.html',
  styleUrls: ['./alarmlog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlarmlogComponent implements OnInit {

  alaramLog:any;
  AhualaramLog:any;
  label:any;
  @ViewChild('dialog',{static: true}) dialog: TemplateRef<any>;

  constructor(private authenticationService: AuthenticationService,
    private datePipe: DatePipe,private dialogService: NbDialogService) { }
  settings = {

    actions: {
      delete: false,
      add: false,
      edit:false,
      position: 'right',
    },
    columns: {
      devicedetails: {
        title: 'Device Name',
        type: 'string',
        valuePrepareFunction: (value) => {
          return value[0].device_name;
        },
      },
      log_message: {
        title: 'Log Message',
        type: 'string',
        valuePrepareFunction:(cell,row)=>{
          if(row.log_message == 'High Temperature'){
            return row.log_message+'  --  '+Number(row.devicedetails[0].device_temp).toFixed(2)+" °";
          }else if(row.log_message == 'High Pressure'){
            return row.log_message+'  --  '+Number(row.devicedetails[0].device_pressure).toFixed(2)+" Pa";
          }else{
            return row.log_message+'  --  '+Number(row.devicedetails[0].device_humidity).toFixed(2)+" %";
          }
          
        },
      },
      created_at: {
        title: 'Log Created Time',
        type: 'string',
        filter:false,
        valuePrepareFunction: (value) => {
         return this.datePipe.transform(value, 'dd-MM-yyyy hh:mm:ss a');
        },
       
      },
       remark:{
         title: 'Remark',
         type: 'string',
         filter:false,
         valuePrepareFunction: (value) => {
           console.log("log",value);
             return value;
         },
      
      
       renderComponent: RemarkComponent,
       onComponentInitFunction(instance) {
         instance.save.subscribe(row => {
            //alert(`${row.devicedetails[0].device_name} saved!`);
         });
       }

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


  ahusettings = {
    actions: {
      delete: false,
      add: false,
      edit:false,
      position: 'right',
    },
    columns: {
      ahudevicedetails: {
        title: 'Device Name',
        type: 'string',
        valuePrepareFunction: (value) => {
          return value[0].device_name;
        },
      },
      log_message: {
        title: 'Log Message',
        type: 'string',
      },
      created_at: {
        title: 'Log Created Time',
        type: 'string',
        filter:false,
        valuePrepareFunction: (value) => {
         return this.datePipe.transform(value, 'dd-MM-yyyy hh:mm:ss a');
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

  ahusource: LocalDataSource = new LocalDataSource();
  response:any;
  ahuresponse:any;

  ngOnInit() {


    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    var json = {
      "user_id": currentUser._id,
    }

    this.authenticationService.getDeviceAlaramLog(json).then((result)=>{
      console.log(result); 
      this.response = result;
      this.alaramLog = this.response.records;
      this.source.load(this.alaramLog);  
      $(".loader").delay(1000).fadeOut("slow");
      $("#overlayer").delay(1000).fadeOut("slow");
    })

    this.authenticationService.getAhuDeviceAlaramLog(json).then((result)=>{
      console.log(result); 
      this.ahuresponse = result;
      this.AhualaramLog = this.ahuresponse.records;
      this.ahusource.load(this.AhualaramLog);
    })

  }




  onCustomAction(event) {
    console.log(event.data);
    switch ( event.action) {
      case 'viewrecord':
        this.saveRemark(event.data);
        console.log(event.data);
        break;
    }
  }

  saveRemark(remark){
    console.log(remark);
  }
  onClick(data){
    console.log("data",data);
  }
  
}
