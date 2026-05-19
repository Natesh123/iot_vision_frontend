import { Component, OnInit, AfterViewInit,ViewChild,TemplateRef,ViewEncapsulation } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { AuthenticationService } from '../../services/index';
import { DatePipe } from '@angular/common';
import { RemarkComponent } from './remark/remark.component';
import { AuremarkComponent } from './auremark/auremark.component';
import { NbDialogService } from '@nebular/theme';
@Component({
  selector: 'ngx-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuditComponent implements OnInit {

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
      name: {
        title: 'User',
        type: 'string',
        valuePrepareFunction: (value) => {
          return value;
        },
      },
       ip: {
        title: 'Ip Address',
        type: 'string',
        valuePrepareFunction: (value) => {
          return value;
        },
      },
      status: {
        title: 'Status',
        type: 'string',
        valuePrepareFunction:(cell,row)=>{
          if(row.status == '1'){
            return "Login";
          }else if(row.status == '2'){
            return "Logout";
          }
        },
      },
      Time: {
        title: 'Time',
        type: 'string',
        filter:false,
        valuePrepareFunction: (value) => {
         return this.datePipe.transform(value, 'dd-MM-yyyy hh:mm:ss a');
        },
       
      }
        
    },
  };

  source: LocalDataSource = new LocalDataSource();

  response:any;
  ahuresponse:any;

  ngOnInit() {


    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    var json = {
      "user_id": currentUser._id,
    }

    this.authenticationService.getAuditLog(json).then((result)=>{
      console.log(result); 
      this.response = result;
      this.alaramLog = this.response.records;
      this.source.load(this.alaramLog);  
      $(".loader").delay(1000).fadeOut("slow");
      $("#overlayer").delay(1000).fadeOut("slow");
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
