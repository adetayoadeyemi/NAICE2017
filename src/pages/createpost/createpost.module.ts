import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatepostPage } from './createpost';

@NgModule({
  declarations: [
    CreatepostPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatepostPage),
  ],
  exports: [
    CreatepostPage
  ]
})
export class CreatepostPageModule {}
