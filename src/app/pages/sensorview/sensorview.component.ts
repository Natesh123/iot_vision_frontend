import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthenticationService } from '../../services';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'ngx-sensorview',
  templateUrl: './sensorview.component.html',
  styleUrls: ['./sensorview.component.scss']
})
export class SensorviewComponent implements OnInit {

  settings = {
    hideSubHeader: true,
    actions: {
      delete: false,
      add: false,
      edit:false,
      position: 'right',
      filter:false,
    },
    columns: {
      created_at: {
        title: 'Date',
        type: 'string',
        valuePrepareFunction: (value) => {
         return this.datePipe.transform(value, 'dd-MM-yyyy');
        },
      },
      created_at1: {
        title: 'Time',
        type: 'string',
        valuePrepareFunction: (col,row) => {
         return this.datePipe.transform(row.created_at, 'HH:mm:ss a');
        },
      },
      device_temp:{
        title:"Temperature",
        type:'string',
        filter:false,
        valuePrepareFunction: (value) => {
          return value;
         },
      },
      device_humidity:{
        title:"Relative Humidity",
        type:'string',
        filter:false,
        valuePrepareFunction: (value) => {
          if(value == null || value == undefined){
              return "-----";
          } else{
            return value;  
          }
          
         },
      },
      remark: {
        title: 'Remarks',
        type: 'string',
        filter:false,
        valuePrepareFunction: (col,row) => {
          return row.remark;
         },
        // // renderComponent: RemarkComponent,
        // onComponentInitFunction:(instance) => {
        //   instance.save.subscribe(row => {
        //     console.log(row);
        //     // alert(`${JSON.parse(row)} saved!`);
        //     // this.handleUpdatedUser();
        //     this.source.refresh();
        //   });
        // },
        
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  records: any=[];
  themeSubscription: any;
  graphData: any = [];
  tempdata: any = [];
  responseSensorReport: any;
  sensorReportData: any;
  device_name: any;
  humiditydata: any = [];
  humdata: any;
  options1: any;
  graphType: any;
  data: any;
  options: any;
  d_name: any;
  viewhumchart:number;
  constructor(private authenticationService: AuthenticationService,
    private datePipe: DatePipe,
    private router: Router,private route: ActivatedRoute,private theme: NbThemeService) { }

  ngOnInit() {
    var data = JSON.parse(localStorage.getItem("sensorview"));
    console.log(data);
    var json = {
      "device_id" :data.id,
      "report_type" : 1
    }

    this.authenticationService.indLogMsgReport(json).then((result)=>{
      console.log(result);
      this.responseSensorReport = result;
      this.sensorReportData = this.responseSensorReport.records;
      console.log(this.sensorReportData);
      this.source.load(this.sensorReportData);
      this.d_name = data.device_name;
      this.tempDeviceData();
       if(data.id >= 70 && data.id <= 78){
        this.viewhumchart = 0;
        console.log('true')
      } else{
        this.viewhumchart = 1;
        console.log('false')
      }

    })

  }

  tempDeviceData(){
    this.graphData = [];
    for(var i = 0; i < this.sensorReportData.length; i++) {
      var date = this.datePipe.transform(this.sensorReportData[i].created_at,'M/d/yy h:mm a');
      this.graphData.push(date);
      var tempdata = this.sensorReportData[i].device_temp;
      this.tempdata.push(tempdata);
      var humiditydata = this.sensorReportData[i].device_humidity;
      this.humiditydata.push(humiditydata);
      this.device_name = this.sensorReportData[0].devicedetails[0].device_name;
    }
   
    console.log(this.device_name);
    console.log("----------",this.graphData);
    this.chartload();
    this.humidityChart();
  }
  chartload(){
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
  
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
  
      this.data = {
        labels: this.graphData,
        datasets: [{
          data: this.tempdata,
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
  
  humidityChart()
  {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
  
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
  
      this.humdata = {
        labels: this.graphData,
        datasets: [{
          data: this.humiditydata,
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
