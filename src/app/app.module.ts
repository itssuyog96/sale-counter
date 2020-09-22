import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SaleComponent } from './sale/sale.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FirebaseUIModule } from 'firebaseui-angular';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportComponent } from './report/report.component';
import { UserPipe } from './user.pipe';
import { PaymentMethodPipe } from './payment-method.pipe';
import { TimePipe } from './time.pipe';
import { CurrencyPipe } from './currency.pipe';

const firebaseConfig = {
  apiKey: "AIzaSyAhVxrON8Yrn8ogL5Eq507W5ci9NPCN-I8",
  authDomain: "sale-counter.firebaseapp.com",
  databaseURL: "https://sale-counter.firebaseio.com",
  projectId: "sale-counter",
  storageBucket: "sale-counter.appspot.com",
  messagingSenderId: "1067111003516",
  appId: "1:1067111003516:web:0ddf84672476d242f160f9",
  measurementId: "G-P307K98HR3"
};

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  tosUrl: 'home',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

const MATERIAL_MODULES = [
  MatListModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatGridListModule,
  MatButtonModule,
  MatInputModule,
  MatSortModule
];

@NgModule({
  declarations: [
    AppComponent,
    SaleComponent,
    HomeComponent,
    LoginComponent,
    SettingsComponent,
    ReportComponent,
    UserPipe,
    PaymentMethodPipe,
    TimePipe,
    CurrencyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AngularFireAuthGuardModule,
    ...MATERIAL_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
