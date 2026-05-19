import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class AuthenticationService {
    // server_url = 'http://192.168.225.97:4001';
    server_url = 'http://192.168.0.250:8081';
    // server_url = 'http://localhost:4001';

    httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    
    constructor(private http: HttpClient) { }


    login(type){        
      return new Promise((resolve,reject)=>{
          this.http.post(this.server_url+'/serviceapi/users/authenticate',type,this.httpOptions).subscribe(outdata=>{
            resolve(outdata);
          },err =>{
            console.log(err);
            reject(err);
          });
      });
  }

  signup(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/register',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
}

  changePassword(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/changePassword',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
}

//CUSTOMER MANAGEMENT

  addCustomer(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/addCustomer',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  getCustomer(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/getCustomer',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }


  updateCustomer(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/updateCustomer',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }


  deleteCustomer(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/deleteCustomer',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }


//DEVICE MANAGEMENT
  addDevices(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/addDevices',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }


  updateDevices(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/updateDevices',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  getDevices(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/getDevices',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }


  deleteDevices(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/deleteDevices',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }


//ASSETS MANAGEMENT
  addAssets(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/addAssets',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  updateAssets(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/updateAssets',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  getAssets(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/getAssets',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }


  deleteAssets(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/deleteAssets',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  // GROUP ASSETS AND DEVICES

  userAssign(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/userAssign',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  // Update Device Conf
  updateDeviceConf(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/updateDeviceConf',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  //Get All sensor Data
  getDashData(type): Promise<any>{        

    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/dashboardData',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  getAllSensor(){
    return new Promise((resolve,reject) => {
      this.http.get(this.server_url+'/serviceapi/users/getAllSensor',this.httpOptions).subscribe(outdata => {
        resolve(outdata);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }
  getIndSensor(type){
    return new Promise((resolve,reject)=>{
      this.http.post(this.server_url+'/serviceapi/users/getIndSensor',type,this.httpOptions).subscribe(outdata=>{
        resolve(outdata);
      },err =>{
        console.log(err);
        reject(err);
      });
  });
  }

  updateSensorDetails(type){
    return new Promise((resolve,reject)=>{
      this.http.post(this.server_url+'/serviceapi/users/updateSensorDetails',type,this.httpOptions).subscribe(outdata=>{
        resolve(outdata);
      },err =>{
        console.log(err);
        reject(err);
      });
  });
  }

  //Get Indiviual Device Data
  getDeviceData(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/dashboardIndiData',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  //Store Device Alaram Log
  storeAlarmLog(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/addDeviceTempLog',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  //Get Device Alaram Log
  getDeviceAlaramLog(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/getDeviceTempLog',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  //Get System Settings
    getSystemSettings(){        
      return new Promise((resolve,reject)=>{
          this.http.post(this.server_url+'/serviceapi/users/getMailOrNotiStatus','',this.httpOptions).subscribe(outdata=>{
            resolve(outdata);
          },err =>{
            console.log(err);
            reject(err);
          });
      });
    }

    //Update System Settings
    updateSystemSettings(type){        
      return new Promise((resolve,reject)=>{
          this.http.post(this.server_url+'/serviceapi/users/updateMailOrNotiStatus',type,this.httpOptions).subscribe(outdata=>{
            resolve(outdata);
          },err =>{
            console.log(err);
            reject(err);
          });
      });
    }


     //Update System Settings
    updateEmailSystemSettings(type){        
      return new Promise((resolve,reject)=>{
          this.http.post(this.server_url+'/serviceapi/users/updateEmailSettings',type,this.httpOptions).subscribe(outdata=>{
            resolve(outdata);
          },err =>{
            console.log(err);
            reject(err);
          });
      });
    }

    //Get Notification Emails
     getNotificationEmails(){        
      return new Promise((resolve,reject)=>{
          this.http.post(this.server_url+'/serviceapi/users/getNotificationEmails','',this.httpOptions).subscribe(outdata=>{
            resolve(outdata);
          },err =>{
            console.log(err);
            reject(err);
          });
      });
    }

      //Delete Notification Emails
     deleteNotificationEmails(type){        
      return new Promise((resolve,reject)=>{
          this.http.post(this.server_url+'/serviceapi/users/deleteNotificationEmails',type,this.httpOptions).subscribe(outdata=>{
            resolve(outdata);
          },err =>{
            console.log(err);
            reject(err);
          });
      });
    }

    


     //Add Notification Emails
     addNotificationEmails(type){        
      return new Promise((resolve,reject)=>{
          this.http.post(this.server_url+'/serviceapi/users/addNotificationEmails',type,this.httpOptions).subscribe(outdata=>{
            resolve(outdata);
          },err =>{
            console.log(err);
            reject(err);
          });
      });
    }
    

  //Get AHU sensor Data
  getAhuDashData(type){        

    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/dashboardAHUData',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  // Update AHU Device Conf
  updateAhuDeviceConf(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/updateAHU',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

    //Get AHU Indiviual Device Data
    getAhuDeviceData(type){        
      return new Promise((resolve,reject)=>{
          this.http.post(this.server_url+'/serviceapi/users/dashboardIndiData',type,this.httpOptions).subscribe(outdata=>{
            resolve(outdata);
          },err =>{
            console.log(err);
            reject(err);
          });
      });
    }

     //Store AHU Device Alaram Log
    storeAhuAlarmLog(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/addAHUDeviceTempLog',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }


   //Get AHU Device Alaram Log
   getAhuDeviceAlaramLog(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/getAHUDeviceTempLog',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  //Sensor Report
  getSensorReport(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/dateWiseLogMsgReport',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  //Add Remark in All Device Log
  updateDeviceTempLog(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/updateDeviceTempLog',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

    //Add Remark in AlarmLog
    updateAlaramDeviceTempLog(type){        
      return new Promise((resolve,reject)=>{
          this.http.post(this.server_url+'/serviceapi/users/updateAlaramDeviceTempLog',type,this.httpOptions).subscribe(outdata=>{
            resolve(outdata);
          },err =>{
            console.log(err);
            reject(err);
          });
      });
    }


  
  updateAHUDeviceTempLog(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/updateAHUDeviceTempLog',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  updateAlaramAHUDeviceTempLog(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/updateAlaramAHUDeviceTempLog',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }
  
  //Sensor Report Pdf 
  sensorPdfReport(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/pdfGen',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  //pdfview
  pdfview(type){        
    return new Promise((resolve,reject)=>{
        this.http.get(this.server_url+'/serviceapi/pdfview').subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  //indLogMsgReport
  indLogMsgReport(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/indLogMsgReport',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }


   //Add Audit Log
  addAuditLog(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/addAuditLog',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }


  //Get Audit Log
  getAuditLog(type){        
    return new Promise((resolve,reject)=>{
        this.http.post(this.server_url+'/serviceapi/users/getAuditLog',type,this.httpOptions).subscribe(outdata=>{
          resolve(outdata);
        },err =>{
          console.log(err);
          reject(err);
        });
    });
  }

  //Get IPAddress
  getIPAddress()  
  {  
    return this.http.get("http://api.ipify.org/?format=json");  
  }  

  //User LogInfo
  userLoginfo() {
    return new Promise((resolve,reject) => {
      this.http.get(this.server_url+'/serviceapi/users/alllog_information',this.httpOptions).subscribe(outdata => {
        resolve(outdata);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  } 

    //Date Wise LogInfo
    getDatewiseLoglist(type){        
      return new Promise((resolve,reject)=>{
          this.http.post(this.server_url+'/serviceapi/users/dateWiseLogInfo',type,this.httpOptions).subscribe(outdata=>{
            resolve(outdata);
          },err =>{
            console.log(err);
            reject(err);
          });
      });
    }

}