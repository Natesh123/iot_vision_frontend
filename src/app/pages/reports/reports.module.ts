import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbDatepickerModule,
  NbIconModule,
  NbCheckboxModule,
  NbDialogModule,
  NbInputModule,
  NbPopoverModule,
  NbTooltipModule,
  NbWindowModule
} from '@nebular/theme';

import { NgxEchartsModule } from 'ngx-echarts';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { ReportsComponent } from './reports.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RemarkComponent } from '../reports/remark/remark.component';
import { AuremarkComponent } from '../reports/auremark/auremark.component';
import { GraphComponent } from './graph/graph.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ReportsRoutingModule,  routedComponents, } from '../reports/reports-routing.module';

@NgModule({
  imports: [
    ReportsRoutingModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
    NbCheckboxModule,
    NbDialogModule,
    NbInputModule,
    NbPopoverModule,
    NbTooltipModule,
    NbWindowModule,
    FormsModule,
    NbDatepickerModule,
    Ng2SmartTableModule,NgxChartsModule,
    ChartModule,
  ],
  declarations: [
    ...routedComponents
  ],
  entryComponents:[
    RemarkComponent,
    AuremarkComponent
  ]
})
export class ReportsModule { }
