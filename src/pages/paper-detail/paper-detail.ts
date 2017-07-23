import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { PaperProvider } from '../../providers/paper/paper';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the PaperDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-paper-detail',
  templateUrl: 'paper-detail.html',
})
export class PaperDetailPage {

  paper:any={}
  isFavourite:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams
  ,private barcodeScanner: BarcodeScanner,
  public loadingCtrl: LoadingController,
  public paperProvider: PaperProvider,private alertCtrl: AlertController) {
      this.paper=this.navParams.get("paper")

      this.paperProvider.getFavPapers().then(value=>{
          if(value.indexOf(this.paper.id)>-1){
              this.isFavourite=true
          }
          else{
              this.isFavourite=false;
          }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaperDetailPage');
  }

  ratePaper(){
      var appContext=this
      this.barcodeScanner.scan().then((barcodeData) => {
            if(barcodeData.text===appContext.paper.paperCode){
                this.navCtrl.push("RatepaperPage",{paper:this.paper})
            }else{
                appContext.presentAlert("Error","Invalid paper code, please select technical paper matching the provided code")
            
            }
            
     }, (err) => {
            appContext.presentAlert("Error","Unable to scan QRCode for this paper, please try again")
    });
    
  }

   addToFav(){
      this.paperProvider.addToFav(this.paper.id).then((value)=>{
          if(value){
              this.isFavourite=true;
          }
      })
  }

  removeFav(){
      this.paperProvider.removeFav(this.paper.id).then((value)=>{
          if(value){
              this.isFavourite=false;
          }
      })
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

sendMessage(){
    this.navCtrl.push("MessagePage",{sendToId:this.paper.authors[0].id})
}

}
