import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the ConnectdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-connectdetails',
  templateUrl: 'connectdetails.html',
})
export class ConnectdetailsPage {

  subject:any={}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.subject=this.navParams.get("subject")
  }

 gotoMessage(){
   this.navCtrl.push("MessagePage",{sendToId:this.subject.id})
 } 

}
