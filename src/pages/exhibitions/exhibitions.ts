import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExhibitionProvider } from '../../providers/exhibition/exhibition';
import { PushProvider } from '../../providers/push/push';

/**
 * Generated class for the Exhibitions page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-exhibitions',
  templateUrl: 'exhibitions.html',
})
export class Exhibitions {

  exhibitions:any[]=[];
  isFav:boolean=false;
  fetchedFav=false;
  staticEx:any[]=[];

  scrollingNotifications:any[]=["Welcome to NAICE 2017"]

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public exhibitionProvider: ExhibitionProvider,public pushProvider:PushProvider) {
      var context=this;

      this.pushProvider.getPublicPush().then((value)=>{
                context.scrollingNotifications=value
        })

      this.isFav=this.navParams.get("isFav")

      this.exhibitionProvider.getExhibitions().then((exhibitions)=>{

          if(context.isFav){
              context.exhibitionProvider.getFavExhibitions().then((favExhibitions)=>{
                  exhibitions.forEach(function(thisExhibition, exhibitionIndex, exhibitionArray) {
                        if(favExhibitions.indexOf(thisExhibition.id)>-1){
                            context.exhibitions.push(thisExhibition)
                            context.staticEx.push(thisExhibition)
                        }
                    })
              });
              
          }else{
              context.exhibitions=exhibitions
              context.staticEx=exhibitions
          }
          
      })

      
      this.fetchedFav=true
      
  }

  ionViewDidEnter(){
      var context=this;
      
      if(!context.fetchedFav){
            
            this.exhibitionProvider.getExhibitions().then((exhibitions)=>{
                if(context.isFav){
                    context.exhibitions=[]
                    context.exhibitionProvider.getFavExhibitions().then((favExhibitions)=>{
                        exhibitions.forEach(function(thisExhibition, exhibitionIndex, exhibitionArray) {
                                if(favExhibitions.indexOf(thisExhibition.id)>-1){
                                    context.exhibitions.push(thisExhibition)
                                    context.staticEx.push(thisExhibition)
                                }
                            })
                    });
                }
                
            })
      }

      context.fetchedFav=false;
  }


  doUpdate(refresher){
      this.exhibitionProvider.updateExhibition(refresher,this);
  }


  showExhibitor(exhibitor){
    this.navCtrl.push("ExhibitionDetailPage",{exhibitor:exhibitor})
  }

  searchExhibitors(ev: any){
    var context=this;

     context.exhibitions=context.staticEx

     let val = ev.target.value;

     if (val && val.trim() != '') {
      context.exhibitions =context.exhibitions.filter((item) => {
        return (item.company.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    
  }


}
