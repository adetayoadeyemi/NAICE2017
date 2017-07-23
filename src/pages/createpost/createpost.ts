import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,ToastController,LoadingController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PostProvider } from '../../providers/post/post';
import { UserProvider } from '../../providers/user/user';
import { Http } from '@angular/http';

/**
 * Generated class for the CreatepostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-createpost',
  templateUrl: 'createpost.html',
})
export class CreatepostPage {

  @ViewChild('myInput') myInput: ElementRef;

  postForm:FormGroup;
  currentUser:any={};
  eventId="";
  dataLoaderIndicator:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public userProvider:UserProvider,postProvider:PostProvider,
  public loadingCtrl: LoadingController,private alertCtrl: AlertController,
  public http: Http,private formBuilder: FormBuilder,private toast: ToastController) {
      var context=this;
      this.eventId=this.navParams.get("eventId")
      this.userProvider.getUser().then((user)=>{
          context.currentUser=user
       })

       context.postForm = this.formBuilder.group({
              sender: [''],
              eventId: [context.eventId,Validators.required],
              post: ['',Validators.required],
              type: ['',Validators.required],
          });
      
        

  }


  submitPost(){
      this.postForm.value.sender=this.currentUser.firstName+" "+this.currentUser.lastName

      this.dataLoaderIndicator=this.loadingCtrl.create({
              content:"Please wait...",
              dismissOnPageChange:true
          });

          this.dataLoaderIndicator.present()

              this.http.post('api/posts',this.postForm.value)
              .timeout(8000)
              .map(res => res.json()).subscribe(data => {
                  this.dataLoaderIndicator.dismiss()
                  this.displayToast("Post sent")
              },
              err =>{
                  
                  if(err.status===400){
                    this.displayToast("Unable to send post")
                    this.dataLoaderIndicator.dismiss()
                  }
                  else{
                    this.dataLoaderIndicator.dismiss()
                    this.presentAlert("Unable to connect","Check internet connectivity settings, and try again")
                  }
                  
              });
      
  }

  ionViewDidLoad() {

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
