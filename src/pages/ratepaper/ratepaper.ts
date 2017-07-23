import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { ScoreValidator } from '../../validators/scorevalidator';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/**
 * Generated class for the RatepaperPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ratepaper',
  templateUrl: 'ratepaper.html',
})
export class RatepaperPage {

  paper:any={};
  currentUser:any={};
  rateForm:FormGroup;
  dataLoaderIndicator:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public userProvider: UserProvider,
              private formBuilder: FormBuilder,public loadingCtrl: LoadingController,
              private alertCtrl: AlertController,public http: Http) {

        this.paper=this.navParams.get("paper")

        this.rateForm = this.formBuilder.group({
            paperCode:[this.paper.paperCode,Validators.required],
            slideQuality: ['', ScoreValidator.isValid],
            presentationClarity: ['',ScoreValidator.isValid],
            presentationTimeliness: ['',ScoreValidator.isValid],
            responseToQuestion: ['',ScoreValidator.isValid],
            engaging:['',ScoreValidator.isValid],
            whoIsRating:['']

      });
  }

  ionViewDidLoad() {
      var context=this;
      this.userProvider.getUser().then((user)=>{
            context.currentUser=user
      })
  }


  submitRating(){

         this.rateForm.value.whoIsRating=this.currentUser.id

          this.dataLoaderIndicator=this.loadingCtrl.create({
              content:"Please wait..."
          });

          this.dataLoaderIndicator.present()



              this.http.post('api/papers/rate',this.rateForm.value)
              .timeout(30000)
              .map(res => res.json()).subscribe(data => {
                  this.dataLoaderIndicator.dismiss()
                  this.presentAlert("Submitted !!!","Ratings submitted successfully")
              },
              err =>{
                  if(err.status===500){
                    this.dataLoaderIndicator.dismiss()
                    this.presentAlert("Unable to connect","Check internet connectivity settings, and try again")
                  }else{
                        this.dataLoaderIndicator.dismiss()
                        this.presentAlert("Error","unable to submit rating")
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


}
