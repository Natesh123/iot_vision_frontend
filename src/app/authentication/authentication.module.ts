import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SigninComponent} from './signin/signin.component';
import { SignupComponent} from './signup/signup.component';
import { ThemeModule } from '../@theme/theme.module';
import { HttpClientModule } from '@angular/common/http';
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
// import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
// import { LockedComponent} from './locked/locked.component';
// import { Page404Component} from './page404/page404.component';
// import { Page500Component} from './page500/page500.component';
// import { PageofflineComponent} from './pageoffline/pageoffline.component';
// import { DropzoneModule } from 'ngx-dropzone-wrapper';

// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    // DropzoneModule,
    FormsModule,
    AuthenticationRoutingModule,
     HttpClientModule,
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
    //NgMultiSelectDropDownModule.forRoot()

  ],
  declarations: [SigninComponent,SignupComponent]
})
export class AuthenticationModule { }