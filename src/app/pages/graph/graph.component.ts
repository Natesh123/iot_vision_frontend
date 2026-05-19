import { Component, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../services/index';
import { loadavg } from 'os';

@Component({
  selector: 'ngx-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  data: any;
  options: any;
  themeSubscription: any;
  data1: any;
  records: any=[];
  graphData: any = [];
  tempdata: any = [];
  responseSensorReport: any;
  sensorReportData: any;
  device_name: any;
  humiditydata: any = [];
  humdata: any;
  options1: any;
  graphType: any;

  constructor(private theme: NbThemeService,
    private authenticationService: AuthenticationService, public datePipe : DatePipe) {}
  ngOnInit() {
    this.data1= JSON.parse(localStorage.getItem("sensorReport"));
    // this.records = this.data1.records;
    this.graphType = localStorage.getItem("graphType");
    console.log(this.data1);

    this.load();
    // this.chartload();
  }

 load()
{
  if(this.graphType == 1){
    this.authenticationService.getSensorReport(this.data1).then((result)=>{
    this.responseSensorReport = result;
    this.sensorReportData = this.responseSensorReport.records;
    console.log(this.sensorReportData);
    this.tempDeviceData();
    })
  }else if(this.graphType == 2) {
    this.authenticationService.getSensorReport(this.data1).then((result)=>{
    this.responseSensorReport = result;
    this.sensorReportData = this.responseSensorReport.records;
    console.log(this.sensorReportData);
    this.tempDeviceData();
    })
  }
  
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
  }
  this.device_name = this.sensorReportData[0].devicedetails[0].device_name;
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
