import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Exhibitions } from './exhibitions';

@NgModule({
  declarations: [
    Exhibitions,
  ],
  imports: [
    IonicPageModule.forChild(Exhibitions),
  ],
  exports: [
    Exhibitions
  ]
})
export class ExhibitionsModule {}
