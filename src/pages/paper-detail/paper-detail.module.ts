import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaperDetailPage } from './paper-detail';

@NgModule({
  declarations: [
    PaperDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PaperDetailPage),
  ],
  exports: [
    PaperDetailPage
  ]
})
export class PaperDetailPageModule {}
