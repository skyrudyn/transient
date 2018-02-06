import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { FirstViewPageModule } from '../pages/first-view/first-view.module';
import { JobPageModule } from '../pages/job/job.module';
import { LoginPageModule } from '../pages/login/login.module';
import { LogoutPageModule } from '../pages/logout/logout.module';
import { MainPageModule } from '../pages/main/main.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { ForgotPasswordPageModule } from '../pages/forgot-password/forgot-password.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServiceProvider } from '../providers/service/service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    FirstViewPageModule,
    JobPageModule,
    LoginPageModule,
    LogoutPageModule,
    MainPageModule,
    ProfilePageModule,
    HttpModule,
    ForgotPasswordPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider
  ]
})
export class AppModule {}
