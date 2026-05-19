/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import { AuthenticationService } from './services/index';
@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
              private router: Router, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
