import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { CustomersComponent } from './customers/customers.component';
import { AssetsComponent } from './assets/assets.component';
import { DevicesComponent } from './devices/devices.component';
import { SensorsComponent } from './sensors/sensors.component';
import { PlcComponent } from './plc/plc.component';
import { AhuComponent } from './ahu/ahu.component';
import { GraphComponent } from './graph/graph.component';
import { AlarmlogComponent } from './alarmlog/alarmlog.component';
import { AuditComponent } from './audit/audit.component';
import { FloormapComponent } from './floormap/floormap.component';
import { ReportsComponent } from './reports/reports.component';
import { LogoutComponent } from './logout/logout.component';
import { SensorviewComponent } from './sensorview/sensorview.component';
import { PdfviewComponent } from './pdfview/pdfview.component';
import { SettingsComponent } from './settings/settings.component';
import { EditsensorsComponent } from './editsensors/editsensors.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'plc',
      component: PlcComponent,
    },
    {
      path: 'editsensors',
      component: EditsensorsComponent,
    },
    {
      path: 'ahu',
      component: AhuComponent,
    },
    {
      path: 'alarmlog',
      component: AlarmlogComponent,
    },
    {
      path: 'sensorview',
      component: SensorviewComponent,
    },
    {
      path: 'pdfview',
      component: PdfviewComponent,
    },
    {
      path: 'floormap',
      component: FloormapComponent,
    },
    {
      path: 'sensors',
      component: SensorsComponent,
    },
    {
      path: 'logout',
      component: LogoutComponent,
    },
    {
      path: 'settings',
      component: SettingsComponent,
    },
     {
      path: 'graph',
      component: GraphComponent,
    },
    //  {
    //   path: 'audit',
    //   component: AuditComponent,
    // },
    {
      path: 'reports',
      loadChildren: () => import('./reports/reports.module')
      .then(m => m.ReportsModule),
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    // {
    //   path: 'editors',
    //   loadChildren: () => import('./editors/editors.module')
    //     .then(m => m.EditorsModule),
    // },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'layout',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
