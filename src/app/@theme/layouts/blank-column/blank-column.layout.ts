import { Component } from '@angular/core';

@Component({
  selector: 'ngx-blank-column-layout',
  template: `
  <nb-layout windowMode>    
    <nb-layout-column style="padding: 0.25rem 1.25rem 0.75rem;">
      <ng-content select="router-outlet"></ng-content>
    </nb-layout-column>

    <nb-layout-footer fixed>
      <ngx-footer></ngx-footer>
    </nb-layout-footer>
  </nb-layout>
`,
  styleUrls: ['./blank-column.layout.scss']
})
export class BlankColumnLayoutComponent {}
