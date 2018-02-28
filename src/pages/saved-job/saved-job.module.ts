import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavedJobPage } from './saved-job';

@NgModule({
  declarations: [
    SavedJobPage,
  ],
  imports: [
    IonicPageModule.forChild(SavedJobPage),
  ],
})
export class SavedJobPageModule {}
