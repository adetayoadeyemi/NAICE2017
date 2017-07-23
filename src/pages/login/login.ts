import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm:FormGroup;
  pinForm:FormGroup;
  signupForm:FormGroup;
  passwordForm:FormGroup;


  dataLoaderIndicator:any;

  errorOccured:boolean=false;

  screen:String='login';

  showCreate:String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   private formBuilder: FormBuilder, public userProvider: UserProvider,
   public loadingCtrl: LoadingController,private alertCtrl: AlertController) {

     this.showCreate=this.navParams.get("showCreate")


      this.loginForm = this.formBuilder.group({
        email: ['', Validators.email],
        password: ['',Validators.required],
      });
    
      this.pinForm = this.formBuilder.group({
      authToken: ['', Validators.required]
    });

    this.passwordForm = this.formBuilder.group({
      email: ['', Validators.email]
    });
    
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required]
      });
  }

  

  login(){
            this.userProvider.login(this.loginForm.value,this)

            this.dataLoaderIndicator=this.loadingCtrl.create({content:"Please wait..."});

            this.dataLoaderIndicator.present()
  }

  pinLogin(){
      
         this.userProvider.pinLogin(this.pinForm.value,this)

         this.dataLoaderIndicator=this.loadingCtrl.create({content:"Please wait..."});
         
         this.dataLoaderIndicator.present()

  }

  getpassword(){
      
         this.userProvider.getPassword(this.passwordForm.value,this)

         this.dataLoaderIndicator=this.loadingCtrl.create({content:"Please wait..."});
         
         this.dataLoaderIndicator.present()

  }

  signUp(){
      
         this.userProvider.signup(this.signupForm.value,this)

            this.dataLoaderIndicator=this.loadingCtrl.create({
              content:"Please wait..."
            });

            this.dataLoaderIndicator.present()

  }

  presentAlert(title,message) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: [
          {
            text:'Got it',
            handler:()=>{
              alert.dismiss()
              return false;
            }
        }]
      });
      alert.present();
}



}
