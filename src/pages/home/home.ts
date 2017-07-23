import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController,Slides } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { PushProvider } from '../../providers/push/push';
import { BrochureProvider } from '../../providers/brochure/brochure';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('mainslide') mainSlides: Slides;
    @ViewChild('notificationsslide') notificationsSlides: Slides;

  

  brochureList:String = 'BrochurelistPage';
  papers:String = 'Papers';
  papersDetails:String = 'Paperdetails';
  speakers:String = 'Speakers';
  navigation:String = 'Navigation';
  exhibitions:String = 'Exhibitions';
  schedules:String = 'Schedules';
  speakerDetails:String = 'Speakerdetails';
  myAccount:String = 'Myaccount';
  notifications:String = 'NotificationsPage';
  connect:String = 'Connect';
  note:String = 'NotePage';

  scrollingNotifications:any[]=["Welcome to NAICE 2017"]

  constructor(public navCtrl: NavController,public userProvider:UserProvider,
  public pushProvider:PushProvider,public brochureProvider:BrochureProvider) {
        var appContext=this
        this.pushProvider.getPublicPush().then((value)=>{
                appContext.scrollingNotifications=value
        })
  }


   goToPage(page){
      this.navCtrl.push(page);
  }

  goToMainPages(page){
      this.navCtrl.push(page,{isFav:false});
  }


  ionViewDidLoad() {
      this.userProvider.registerDevice();
      
  }

  ionViewDidEnter(){
     this.pushProvider.updatePush(null,null,false);
  }
  
}
