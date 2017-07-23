import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrochurelistPage } from './brochurelist';

@NgModule({
  declarations: [
    BrochurelistPage,
  ],
  imports: [
    IonicPageModule.forChild(BrochurelistPage),
  ],
  exports: [
    BrochurelistPage
  ]
})
export class BrochurelistPageModule {}
