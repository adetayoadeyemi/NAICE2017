import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { ExhibitionProvider } from '../../providers/exhibition/exhibition';

/**
 * Generated class for the ExhibitionDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-exhibition-detail',
  templateUrl: 'exhibition-detail.html',
})
export class ExhibitionDetailPage {

  shownService=null
  exhibitor:any={};
  isFavourite:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public exhibitionProvider: ExhibitionProvider) {
      
      this.exhibitor=this.navParams.get("exhibitor")
      this.exhibitionProvider.getFavExhibitions().then(value=>{
          if(value.indexOf(this.exhibitor.id)>-1){
              this.isFavourite=true
          }
          else{
              this.isFavourite=false;
          }
      })
  }

  ionViewDidLoad() {
    
  }

  toggleService(service) {
    if (this.shownService===service) {
        this.shownService = null;
    } else {
        this.shownService = service;
    }
  }

  addToFav(){
      this.exhibitionProvider.addToFav(this.exhibitor.id).then((value)=>{
          if(value){
              this.isFavourite=true;
          }
      })
  }

  removeFav(){
      this.exhibitionProvider.removeFav(this.exhibitor.id).then((value)=>{
          if(value){
              this.isFavourite=false;
          }
      })
  }

gotoMessage(){
   this.navCtrl.push("MessagePage",{sendToId:this.exhibitor.accountID})
 } 



}
