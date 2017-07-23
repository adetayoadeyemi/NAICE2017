import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConnectdetailsPage } from './connectdetails';

@NgModule({
  declarations: [
    ConnectdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConnectdetailsPage),
  ],
  exports: [
    ConnectdetailsPage
  ]
})
export class ConnectdetailsPageModule {}
