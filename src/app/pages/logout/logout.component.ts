import { Component, OnInit } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import { AuthenticationService } from '../../services/index';
import { IpServiceService } from '../../services/ip-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  ipadd:any;
  ipAddress:string;
  deviceInfo = null;
  browsername :string;
  constructor(private router: Router,
     private authenticationService: AuthenticationService, 
     private ip:IpServiceService,
     private deviceService: DeviceDetectorService) {    
       this.epicFunction();
      }
      epicFunction() {
        console.log('hello `Home` component');
        this.deviceInfo = this.deviceService.getDeviceInfo();
        const isMobile = this.deviceService.isMobile();
        const isTablet = this.deviceService.isTablet();
        const isDesktopDevice = this.deviceService.isDesktop();
        if(isDesktopDevice == true){
          console.log("Desktop")
        }
        console.log(this.deviceInfo);
        console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
        console.log(isTablet);  // returns if the device us a tablet (iPad etc)
        console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
      }

  ngOnInit() {
    // this.getIP();
    console.log(this.deviceInfo);
     // console.log("Ip",this.ipAddress);
     this.browsername = this.deviceInfo.browser;
     console.log(this.browsername);
     var currentUser = JSON.parse(localStorage.getItem('currentUser'));
     this.authenticationService.getIPAddress().subscribe((res:any)=>{  
      this.ipadd = res.ip;  

      var json = {
      "user_id": currentUser._id,
      "user_name": currentUser.email, 
      "ip_address" : this.ipadd,
      "status" : "2",
      "type" : "2",
      "device_name": this.browsername
    }

    
    this.authenticationService.addAuditLog(json).then((result)=>{
        console.log('audit Stored');
    })
      
  });  

    localStorage.removeItem('currentUser');
    localStorage.removeItem('room_id');
    localStorage.removeItem('system_settings');
    this.router.navigate(['/authentication/signin']);
  }
  // getIP()
  // {
  //   this.ip.getIPAddress().subscribe((res:any)=>{
  //     this.ipAddress=res.ip;
  //     // console.log("Ip",this.ipAddress);
  //   });
  // }

}
