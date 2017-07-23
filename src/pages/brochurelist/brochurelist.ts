import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,LoadingController,AlertController } from 'ionic-angular';
import { BrochureProvider } from '../../providers/brochure/brochure';
import { Brochure } from '../../models/Brochure';
import {FileTransfer,FileTransferObject} from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { PushProvider } from '../../providers/push/push';
import { Http } from '@angular/http';


declare var cordova: any;

/**
 * Generated class for the BrochurelistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-brochurelist',
  templateUrl: 'brochurelist.html',
})
export class BrochurelistPage {

  brochures:Brochure[];

  storageDirectory: string = '';

  pdfLoadingIndicator:any;

  scrollingNotifications:any[]=["Welcome to NAICE 2017"]

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public loadingCtrl: LoadingController,private alertCtrl: AlertController,
  public brochureProvider: BrochureProvider,public platform: Platform,
  private transfer: FileTransfer,private fileOpener: FileOpener,
  public pushProvider:PushProvider,public http: Http) {

      var context=this;

      this.pushProvider.getPublicPush().then((value)=>{
                context.scrollingNotifications=value
        })

    if (this.platform.is('ios')) {
        context.storageDirectory = cordova.file.documentsDirectory;
      }
      else if(this.platform.is('android')) {
        context.storageDirectory = cordova.file.dataDirectory;
      }


  }

  

  openBrochure(brochure) {
    var appContext=this;
    if(brochure.source.existLocal){

        this.fileOpener.open(appContext.storageDirectory+brochure.id, 'application/pdf')
        .then(() =>{
    
        })
        .catch(e =>{
            appContext.presentAlert("Error","Unable to open "+brochure.name+", a pdf reader must be installed on this device")
        });

    }else{
      
      appContext.pdfLoadingIndicator=this.loadingCtrl.create({});

      appContext.pdfLoadingIndicator.data.content="Downloading "+brochure.name+" ...."

      appContext.pdfLoadingIndicator.present();

      this.http.get('api/brochs/'+brochure.id)
      .timeout(8000)
      .subscribe(data => {
            
            const fileTransfer: FileTransferObject = this.transfer.create();
            var url=brochure.source.url.split(" ").join("+")
            fileTransfer.download(url,appContext.storageDirectory+brochure.id).then((entry) => {

                brochure.existLocal=true;
                brochure.localUrl=appContext.storageDirectory+brochure.id
                appContext.pdfLoadingIndicator.data.content="Download completed"
                appContext.pdfLoadingIndicator.dismiss();

                this.brochureProvider.getBrochures().then((brochures)=>{
                        brochures.forEach(function(thisBrochure, brochureIndex, brochureArray) {
                                if(thisBrochure.id===brochure.id){
                                    thisBrochure.source.existLocal=true;
                                    thisBrochure.source.localUrl=appContext.storageDirectory+brochure.id
                                }
                        })

                        this.brochureProvider.setBrochure(brochures);

                        this.fileOpener.open(appContext.storageDirectory+brochure.id, 'application/pdf')
                        .then(() =>{
                            
                        })
                        .catch(e =>{
                           appContext.presentAlert("Error","Unable to open "+brochure.name+", a pdf reader must be installed on this device")
                        });
                })

                }, (error) => {
                    appContext.pdfLoadingIndicator.dismiss();
                    this.presentAlert("Download failed","Please check your internet connectivity settings, and try again")

                });


       },
       err =>{
                if(err.status===500){
                    this.pdfLoadingIndicator.dismiss()
                    this.presentAlert("Unable to connect","Check internet connectivity settings, and try again")
                }else{
                        this.pdfLoadingIndicator.dismiss()
                        this.presentAlert("Oops",brochure.name+" cannot be downloaded yet, please check back later")
                        console.log(err.statusText)
                        console.log(err.status)
                }         
      });

    
    }
  }

  ionViewDidLoad() {
      var context=this;
      this.brochureProvider.getBrochures().then((brochures)=>{
          context.brochures=brochures
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


   
}
