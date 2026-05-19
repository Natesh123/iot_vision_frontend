import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewsensorComponent } from './viewsensor/viewsensor.component';
import { ViewAahusensorComponent } from './view-aahusensor/view-aahusensor.component';
import { PdfviewComponent } from './pdfview/pdfview.component'
const routes: Routes = [
    {
        path: 'viewsensor',
        component: ViewsensorComponent
    },
    {
        path: 'viewahusensor',
        component: ViewAahusensorComponent
    },
    {
        path: 'viewpdf',
        component: PdfviewComponent
    },
    {
      path: '',
      redirectTo: 'viewpdf',
      pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class IndividualSensorRoutingModule { }