import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ReportsComponent } from '../reports/reports.component';
import { GraphComponent } from './graph/graph.component';
import { RemarkComponent } from './remark/remark.component';
import { AuremarkComponent } from './auremark/auremark.component';

const routes: Routes = [{
  path: '',
  component: ReportsComponent,
  children: [
    {
      path: 'graph1',
      component: GraphComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {
}


export const routedComponents = [
  ReportsComponent,
  GraphComponent,
  ReportsComponent,
  RemarkComponent,
  AuremarkComponent
];

