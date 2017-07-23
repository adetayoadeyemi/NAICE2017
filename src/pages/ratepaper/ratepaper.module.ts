import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RatepaperPage } from './ratepaper';

@NgModule({
  declarations: [
    RatepaperPage,
  ],
  imports: [
    IonicPageModule.forChild(RatepaperPage),
  ],
  exports: [
    RatepaperPage
  ]
})
export class RatepaperPageModule {}
