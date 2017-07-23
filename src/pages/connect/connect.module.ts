import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Connect } from './connect';

@NgModule({
  declarations: [
    Connect,
  ],
  imports: [
    IonicPageModule.forChild(Connect),
  ],
  exports: [
    Connect
  ]
})
export class ConnectModule {}
