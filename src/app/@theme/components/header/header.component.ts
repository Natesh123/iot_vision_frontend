import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { AuthenticationService } from '../../../services/index';
import { UserData } from '../../../@core/data/users';
import {NavigationStart, Router} from '@angular/router';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  room_id:any;
  today: number = Date.now();
  themes = [
    {
      value: 'default',
      name: 'Light Mode',
    },
    {
      value: 'dark',
      name: 'Dark Mode',
    },
  ];

  currentTheme = 'default';
  response: any;
  systemData:any;
  alarmlog_status: any;
  email_status: any;
  update_alarmlog_status: any;
  update_email_status: any;
  username:any;
  userMenu:any;
  user_role_based:any;
  setting_option:any;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private authenticationService:AuthenticationService,
              private router: Router) {

              setInterval(() => {this.today = Date.now()}, 1);
  }

  ngOnInit() {
    

    if(localStorage.getItem("currentUser") == undefined){
      this.router.navigate(['/authentication/signin']);
    }
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(currentUser.user_role == 0 || currentUser.user_role == 1 || currentUser.user_role == 6){
      this.user_role_based = 1;
    } else{
      this.user_role_based = 0;
    }

    if(currentUser.user_role == 1 || currentUser.user_role == 6){
        this.setting_option = 1;

          this.userMenu = [ 
      // {
      //  title: 'Audit Logs',
      //  icon: 'browser-outline',
      //  link: '/pages/audit'
      // },
      {
       title: 'Settings',
       icon: 'settings-outline',
       link: '/pages/settings'
      },  
      {
       title: 'Log out',
       icon: 'power-outline',
       link: '/pages/logout'
      }
      
    ];

    } else{
        this.setting_option = 0;

          this.userMenu = [ 
      {
       title: 'Log out',
       icon: 'power-outline',
       link: '/pages/logout'
      }
      
    ];
    }

  
      

  
    this.username = currentUser.name;
    this.room_id = localStorage.getItem('room_id');

    this.getSystemSettings()
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
     
      
      // function isFullscreen(){ return 1 >= outerHeight - innerHeight };
      this.sidebarService.toggle(true, 'menu-sidebar');
      // this.layoutService.changeLayoutSize();
  }
  
  ngAfterViewInit() {
    this.toggleSidebar();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(values:any) {
    var checkboxmode = values.currentTarget.checked;
    if(checkboxmode == true){
      this.themeService.changeTheme('dark');
    } else{
      this.themeService.changeTheme('default');
    }
  
  }

  changeRoom(room){
    console.log(room);
    localStorage.removeItem('room_id');
    localStorage.setItem('room_id',room);
    location.reload(); 
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    // this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }


  getSystemSettings(){
    
    this.authenticationService.getSystemSettings().then((result)=>{
      this.response = result;
      this.systemData = this.response.records[0];
      
      if(this.systemData.email_status == '1'){
        this.email_status = true;
      } else{
        this.email_status = false;
      }

      if(this.systemData.alarm_log_status == '1'){
        this.alarmlog_status = true;
      } else{
        this.alarmlog_status = false;
      }
      localStorage.removeItem("system_settings");
      localStorage.setItem("system_settings",JSON.stringify(this.systemData));

    })

  }

  updateSystemSettings(value,ref){

    var settings = JSON.parse(localStorage.getItem('system_settings'));

    if(ref == 1){
      if(value == true){
        this.update_alarmlog_status = '1'
      } else{
        this.update_alarmlog_status = '0';
      }

      var json = {
        "_id": settings._id,
        "updateObj":{
          "alarm_log_status": this.update_alarmlog_status,
        }
      }
  
      this.authenticationService.updateSystemSettings(json).then((result)=>{
          this.response = result;
          this.systemData = this.response;
          
          if(this.systemData.status ==  'success'){
            this.getSystemSettings();
          }
    
      })

    } else if(ref == 2){
      if(value == true){
        this.update_email_status = '1';
      } else{
        this.update_email_status = '0';
      }

      var json1 = {
        "_id": settings._id,
        "updateObj":{
          "email_status": this.update_email_status
        }
      }
  
      this.authenticationService.updateSystemSettings(json1).then((result)=>{
          this.response = result;
          this.systemData = this.response;
          
          if(this.systemData.status ==  'success'){
            this.getSystemSettings();
          }
    
        })
    }
   
  }
}
