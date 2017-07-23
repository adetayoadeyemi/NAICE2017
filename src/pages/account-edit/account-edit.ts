import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController,LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { UserProvider } from '../../providers/user/user';


/**
 * Generated class for the AccountEditPage page.
 *;

 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account-edit',
  templateUrl: 'account-edit.html',
})
export class AccountEditPage {

  @ViewChild('myInput') myInput: ElementRef;

  updateForm:FormGroup;
  currentUser:any={};
  dataLoaderIndicator:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,private alertCtrl: AlertController,
              public http: Http,private toast: ToastController,public userProvider:UserProvider) {

              this.currentUser=this.navParams.get("currentUser")

      this.updateForm = this.formBuilder.group({
        emailAddress: [this.currentUser.emailAddress, Validators.email],
        firstName: [this.currentUser.firstName,Validators.required],
        lastName: [this.currentUser.lastName,Validators.required],
        company: [this.currentUser.company],
        social:[this.currentUser.social],
        profile:[this.currentUser.profile],
        password:['tignre'],
        subjectRoles:[this.currentUser.subjectRoles],
        id:[this.currentUser.id],
        authToken:[this.currentUser.authToken],
        pushToken:[""],
        subjectPermissions:[this.currentUser.subjectPermissions]
      });

  }

  updateData(){

          this.dataLoaderIndicator=this.loadingCtrl.create({
              content:"Please wait...",
              dismissOnPageChange:true
          });

          this.dataLoaderIndicator.present()

              this.http.put('api/subject',this.updateForm.value)
              .timeout(8000)
              .map(res => res.json()).subscribe(data => {
                  this.dataLoaderIndicator.dismiss()
                  this.displayToast("Profile updated")
                  this.userProvider.setUser(this.updateForm.value);
              },
              err =>{
                    console.log(err.status)
                  
                  if(err.status===400){
                    this.displayToast("Unable to update profile")
                    this.dataLoaderIndicator.dismiss()
                  }
                  else{
                    this.dataLoaderIndicator.dismiss()
                    this.presentAlert("Unable to connect","Check internet connectivity settings, and try again")
                  }
                  
              });
          
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


displayToast(toastMessage: string){
  this.toast.create({
    message: toastMessage,
    duration: 3000
  }).present();
}


resize() {
      var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      var scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

}
