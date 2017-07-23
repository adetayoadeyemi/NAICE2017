import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar} from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'app.html',
  
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:String;
  currentUser:any={}

  constructor(platform: Platform, statusBar: StatusBar,
   splashScreen: SplashScreen,
   public storage: Storage,public userProvider:UserProvider) {

            this.storage.get('hasLoggedIn')
            .then((hasLoggedIn) => {
                if (hasLoggedIn) {
                  this.rootPage = 'HomePage';
                } else {
                  this.rootPage = 'LoginPage';
                }
            });
     
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  logout() {
    this.userProvider.logout();
    this.nav.setRoot('LoginPage');
  }


  clearData(){
    this.storage.clear()
  }

  ionViewDidLoad() {
       var context=this;
       this.userProvider.getUser().then((user)=>{
          context.currentUser=user
       })
  }

  goHome(){
    this.nav.setRoot("HomePage")
  }

  goTo(page){
    this.nav.push(page);
  }
  
}

