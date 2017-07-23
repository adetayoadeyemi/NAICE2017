import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,ToastController,LoadingController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { Http } from '@angular/http';


/**
 * Generated class for the MessagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  @ViewChild('myInput') myInput: ElementRef;

   messageForm:FormGroup;
   sendToId:String
   currentUser:any={};
   dataLoaderIndicator:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder,public userProvider:UserProvider,
              public loadingCtrl: LoadingController,private alertCtrl: AlertController,
              public http: Http,private toast: ToastController) {

          var context=this

          this.sendToId=this.navParams.get("sendToId")
          this.userProvider.getUser().then((user)=>{
            context.currentUser=user
          })

          this.messageForm = this.formBuilder.group({
              subject: ['', Validators.required],
              body: ['',Validators.required],
              sendTo: [this.sendToId,Validators.required],
              from: [''],
              fromID: ['']
          });
  }

 submitPost(){
      this.messageForm.value.fromID=this.currentUser.id
      this.messageForm.value.from=this.currentUser.firstName+" "+this.currentUser.lastName

      this.dataLoaderIndicator=this.loadingCtrl.create({
              content:"Please wait...",
              dismissOnPageChange:true
          });

          this.dataLoaderIndicator.present()

              this.http.post('api/pushs',this.messageForm.value)
              .timeout(8000)
              .map(res => res.json()).subscribe(data => {
                  this.dataLoaderIndicator.dismiss()
                  this.displayToast("Message sent")
              },
              err =>{
                  
                  if(err.status===400){
                    this.displayToast("Unable to send this message, please update your profile")
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
