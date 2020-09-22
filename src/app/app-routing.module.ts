import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleComponent } from './sale/sale.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { canActivate, redirectUnauthorizedTo, AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { SettingsComponent } from './settings/settings.component';
import { ReportComponent } from './report/report.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sale', component: SaleComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'home', component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'report', component: ReportComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'settings', component: SettingsComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
