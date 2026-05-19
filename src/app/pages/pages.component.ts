import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from './pages-menu';
import { MENU_ITEMS1 } from './pages-menu';
import { MENU_ITEMS2 } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  // menu= MENU_ITEMS ;
  menu :any;
  // public NbMenuItems: any[];
  role :any;

  ngOnInit(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.role = currentUser.user_role;
    if(this.role == 0 || this.role == 1 || this.role == 2 || this.role == 3 || this.role == 4){
      this.menu = MENU_ITEMS;
    }else if(this.role == 5){
    
      this.menu = MENU_ITEMS1;

    }else if (this.role == 6){

      this.menu = MENU_ITEMS2;

    }

      
    }
  }

