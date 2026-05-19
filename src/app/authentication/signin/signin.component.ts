import { Component, OnInit,ViewEncapsulation,Renderer,ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/index';
import { IpServiceService } from '../../services/ip-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import Swal from 'sweetalert2';

declare const swal: any;

@Component({
  selector: 'ngx-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {

  @ViewChild('#username',{static: true}) inp:ElementRef;
   
  model: any = {};
  loading = false;
  returnUrl: string;
  failmsg: string;
  failmsg_verify: string;
  ipadd:any;
  year = (new Date()).getFullYear();
  ipAddress:string;
  deviceInfo = null;
  browsername :string;
  constructor(private route: ActivatedRoute,
      private renderer: Renderer,
      private router: Router,
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
      setFocus() {
          this.renderer.invokeElementMethod(this.inp.nativeElement, 'focus');
        }

  ngOnInit() {
    this.getIP();
  }
  getIP()
  {
    this.ip.getIPAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
      // console.log("Ip",this.ipAddress);
    });
  }
  login() {
    console.log(this.deviceInfo);
     console.log("Ip",this.ipAddress);
    this.browsername = this.deviceInfo.browser;
    console.log(this.browsername);
    console.log(this.model.email);
    console.log(this.model.password);
    var json = {'email': this.model.email, "password": this.model.password,"device_name":this.browsername,"ip_address":this.ipAddress};
    this.authenticationService.login(json).then((result)=>{
      console.log(result);
      if(result == 'invalid_username_password' || result == 'invalid_user'){
        this.failmsg = "1";
        this.loading = false;
       
        Swal.fire(
          'Invalid username / password',
          '',
          'error'
        );

    } else if(result == 'account_not_verified'){
      this.failmsg = "1";
      this.loading = false;
      Swal.fire(
        'Account Not Verified',
        '',
        'warning'
      );
    }

    if(result!='invalid_username_password' && result!='account_not_verified' && result!='invalid_user'){
      this.router.navigate(['/pages/sensors']);
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(result));
       var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if(currentUser.user_role == 2 || currentUser.user_role == 0 || currentUser.user_role == 1 || currentUser.user_role == 5 || currentUser.user_role == 6 ){
          localStorage.setItem('room_id','1');
      } else if(currentUser.user_role == 3){
          localStorage.setItem('room_id','2');
      } else if(currentUser.user_role == 4){
          localStorage.setItem('room_id','3');
      }

      this.authenticationService.getIPAddress().subscribe((res:any)=>{  
      this.ipadd = res.ip;  

      var json = {
      "user_id": currentUser._id,
      "user_name": currentUser.email, 
      "ip_address" : this.ipAddress,
      "status" : "1",
      "type" : "2",
      "device_name" : this.browsername
    }

    
    // this.authenticationService.addAuditLog(json).then((result)=>{
    //     console.log('audit Stored');
    // })
      
  });  
      


    }
         
    })
  }

}
