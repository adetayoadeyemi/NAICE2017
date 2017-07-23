import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Papers } from './papers';

@NgModule({
  declarations: [
    Papers,
  ],
  imports: [
    IonicPageModule.forChild(Papers),
  ],
  exports: [
    Papers
  ]
})
export class PapersModule {}
