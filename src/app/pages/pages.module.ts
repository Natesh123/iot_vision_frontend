import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { CustomersModule } from './customers/customers.module'
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AssetsModule } from './assets/assets.module';
import { DevicesModule } from './devices/devices.module';
import { SensorsModule } from './sensors/sensors.module';
import { SettingsModule } from './settings/settings.module';
import { AlarmlogModule } from './alarmlog/alarmlog.module';
import { AuditModule } from './audit/audit.module';
import { AhuModule } from './ahu/ahu.module';
import { ReportsModule } from './reports/reports.module'
import { PlcComponent } from './plc/plc.component';
import { FloormapComponent } from './floormap/floormap.component';
import { LogoutComponent } from './logout/logout.component';

import { GraphComponent } from '../pages/graph/graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { SensorviewComponent } from './sensorview/sensorview.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PdfviewComponent } from './pdfview/pdfview.component';
import { EditsensorsComponent } from './editsensors/editsensors.component';
import {
  NbActionsModule,
  NbButtonModule,
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
import { FormsModule } from '@angular/forms';
import { EditmodelComponent } from './editsensors/editmodel/editmodel.component';



@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    CustomersModule,
    AssetsModule,
    DevicesModule,
    SensorsModule,
    SettingsModule,
    AlarmlogModule,
    AuditModule,
    AhuModule,
    ReportsModule,
    NgxChartsModule,
    ChartModule,
    Ng2SmartTableModule,
    NbDatepickerModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    FormsModule,

    NbActionsModule,
   
    NbTabsetModule,
    NbUserModule,
    NbRadioModule,
   
    NbListModule,
 
    NbIconModule,
    NbCheckboxModule,
    NbDialogModule,
  
    NbPopoverModule,
    NbTooltipModule,
    NbWindowModule
  ],
  declarations: [
    PagesComponent,
    PlcComponent,
    FloormapComponent,
    LogoutComponent,GraphComponent, SensorviewComponent, PdfviewComponent, EditsensorsComponent, EditmodelComponent,
  ],
  entryComponents:[
    SensorviewComponent,
    EditmodelComponent
  ]
  
})
export class PagesModule {
}
