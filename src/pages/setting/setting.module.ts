import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingPage } from './setting';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    SettingPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingPage),
    Ionic2RatingModule
  ],
})
export class SettingPageModule {}
