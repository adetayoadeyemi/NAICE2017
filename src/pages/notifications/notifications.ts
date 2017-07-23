import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PushProvider } from '../../providers/push/push';

/**
 * Generated class for the NotificationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  pushs:any[]=[]
  shownMessage=null;

  constructor(public navCtrl: NavController, public navParams: NavParams,public pushProvider: PushProvider) {

  }

  ionViewDidLoad() {
    var appContext=this;
    this.pushProvider.getPush().then((value)=>{
      appContext.pushs=value;
      appContext.pushs.reverse();
    })
  }

  doUpdate(refresher){
      this.pushProvider.updatePush(refresher,this,true);
  }

  toggleMessage(message) {
    if (this.shownMessage===message) {
        this.shownMessage = null;
    } else {
        this.shownMessage = message;
    }
    
}

goToMessage(message){
  this.navCtrl.push("MessagePage",{sendToId:message.fromID})
}

deleteMessage(push){
  var mycontext=this;
  this.pushProvider.deleteMessage(push.id).then((value)=>{
    if(value){
        mycontext.pushs=value
    }
  })
}


}
