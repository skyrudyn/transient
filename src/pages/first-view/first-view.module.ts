import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstViewPage } from './first-view';
import { CalendarModule } from "ion2-calendar";

@NgModule({
  declarations: [
    FirstViewPage,
  ],
  imports: [
    CalendarModule,
    IonicPageModule.forChild(FirstViewPage),
  ],
})
export class FirstViewPageModule {}
