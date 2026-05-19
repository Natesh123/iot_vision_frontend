import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthenticationService } from '../../../services/authentication.service';
import { RouterEvent, Router, ActivatedRoute } from '@angular/router';
import { DatePipe, JsonPipe } from '@angular/common';
import { SmartTableData } from '../../../@core/data/smart-table';
import * as moment from 'moment-timezone';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  loginfo : any;
  loginfoData : any;
  lable  :any;
  model:any={};
  date_json: any;
  datewiselist :any;
  datewiseData : any;

  settings = {
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    actions: {
      delete: false,
      add: false,
      edit:false,
      position: 'right'
    },
    columns: {
      // id: {
      //   title: 'ID',
      //   type: 'number',
      // },
      // firstName: {
      //   title: 'First Name',
      //   type: 'string',
      // },
      // lastName: {
      //   title: 'Last Name',
      //   type: 'string',
      // },
      date: {
        title: 'Date',
        type: 'number',
        filter:false,
      },
      user_name: {
        title: 'Username',
        type: 'string',
        filter:false,
      },
      device_name: {
        title: 'Devicename',
        type: 'string',
        filter:false,
      },
      ip_address: {
        title: 'Ipaddress',
        type: 'number',
        filter:false,
      },
      time: {
        title: 'Time',
        type: 'string',
        filter:false,
      },
      type: {
        title: 'Status',
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value == '1') {
            this.lable = `<span class="badge badge-pill badge-warning">Login</span>`;
          } else if (value == '2') {
            this.lable = `<span class="badge badge-pill badge-success">Logout</span>`;
          } else {
            
          }
        return this.lable;
        }
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private authenticationService: AuthenticationService,
    private router: Router,private route: ActivatedRoute,
    private datePipe: DatePipe,) {
    // const data = this.service.getData();
    // this.source.load(data);
  }
  ngOnInit() {
    this.userLoginfo();
  }
  
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  userLoginfo(){
    this.authenticationService.userLoginfo().then((result)=>{
      this.loginfo = result;
      this.loginfoData = this.loginfo.records;
      console.log("loginfo",this.loginfoData)
      this.source.load(this.loginfoData);
      
    })
  }
  getDatewiseLoglist(){
    var startDate = this.datePipe.transform(this.model.choosedDate.start, 'dd-MM-yyyy');
    // var endDate = this.datePipe.transform(this.model.choosedDate.end, 'yyyy-MM-dd');
  console.log("startdate",startDate)
  // console.log("enddate",endDate)
    // var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.date_json = {
      "date":startDate,
      // "end_date":endDate,
    }

    this.authenticationService.getDatewiseLoglist(this.date_json).then((result)=>{
      this.datewiselist = result;
      this.datewiseData = this.datewiselist.records;
      console.log("datewiseDate", this.datewiseData)
      this.source.load(this.datewiseData);
    })
    
  }
}
