import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { IndividualSensorRoutingModule } from './individual_sensor-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { HttpClientModule } from '@angular/common/http';
import { ViewsensorComponent } from './viewsensor/viewsensor.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbCheckboxModule,
  NbDialogModule,
  NbInputModule,
  NbPopoverModule,
  NbTooltipModule,
  NbWindowModule
} from '@nebular/theme';

import { NgxEchartsModule } from 'ngx-echarts';
import { ViewAahusensorComponent } from './view-aahusensor/view-aahusensor.component';
import { PdfviewComponent } from './pdfview/pdfview.component';

@NgModule({
  imports: [
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
    CommonModule,
    // DropzoneModule,
    FormsModule,
    IndividualSensorRoutingModule,
     HttpClientModule,
    //NgMultiSelectDropDownModule.forRoot()

  ],
  declarations: [ViewsensorComponent, ViewAahusensorComponent, PdfviewComponent]
})
export class IndividualSensorModule { }