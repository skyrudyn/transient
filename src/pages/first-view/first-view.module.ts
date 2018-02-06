import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstViewPage } from './first-view';

@NgModule({
  declarations: [
    FirstViewPage,
  ],
  imports: [
    IonicPageModule.forChild(FirstViewPage),
  ],
})
export class FirstViewPageModule {}
