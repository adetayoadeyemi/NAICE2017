import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExhibitionDetailPage } from './exhibition-detail';

@NgModule({
  declarations: [
    ExhibitionDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ExhibitionDetailPage),
  ],
  exports: [
    ExhibitionDetailPage
  ]
})
export class ExhibitionDetailPageModule {}
