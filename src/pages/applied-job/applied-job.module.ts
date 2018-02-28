import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppliedJobPage } from './applied-job';

@NgModule({
  declarations: [
    AppliedJobPage,
  ],
  imports: [
    IonicPageModule.forChild(AppliedJobPage),
  ],
})
export class AppliedJobPageModule {}
