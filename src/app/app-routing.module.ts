import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// import {
//   NbAuthComponent,
//   NbLoginComponent,
//   NbLogoutComponent,
//   NbRegisterComponent,
//   NbRequestPasswordComponent,
//   NbResetPasswordComponent,
// } from '@nebular/auth';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module')
      .then(m => m.AuthenticationModule),
  },
  {
    path: 'indiviualsensor',
    loadChildren: () => import('./individual_sensor/individual_sensor.module')
      .then(m => m.IndividualSensorModule),
  },
 
  { path: '', redirectTo: 'authentication', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
  { path: '**', redirectTo: 'indiviualsensor' },
  { path: '**',redirectTo: 'viewpdf'}
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
