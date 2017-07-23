import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Speakers } from './speakers';

@NgModule({
  declarations: [
    Speakers,
  ],
  imports: [
    IonicPageModule.forChild(Speakers),
  ],
  exports: [
    Speakers
  ]
})
export class SpeakersModule {}
