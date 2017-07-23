import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the Myaccount page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class Myaccount {

  currentUser:any={}
  fetchedUser=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
       var context=this;
       this.userProvider.getUser().then((user)=>{
          context.currentUser=user
       })

       this.fetchedUser=true;
  }

  ionViewDidEnter() {
       var context=this;

       if(!this.fetchedUser){
          this.userProvider.getUser().then((user)=>{
              context.currentUser=user
          })
       }

       this.fetchedUser=false;
  }



  editAccount(){
    this.navCtrl.push("AccountEditPage",{currentUser:this.currentUser})
  }

  openFav(page){
     this.navCtrl.push(page,{isFav:true})
  }

  openAction(page){
    this.navCtrl.push(page)
  }

 logout() {
    this.userProvider.logout();
    this.navCtrl.setRoot('LoginPage',{showCreate:'NO'});
  }


}
