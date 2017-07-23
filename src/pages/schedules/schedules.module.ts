import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Schedules } from './schedules';

@NgModule({
  declarations: [
    Schedules,
  ],
  imports: [
    IonicPageModule.forChild(Schedules),
  ],
  exports: [
    Schedules
  ]
})
export class SchedulesModule {}
