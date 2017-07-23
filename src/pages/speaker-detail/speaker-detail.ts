import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { SubjectProvider } from '../../providers/subject/subject';
import { PushProvider } from '../../providers/push/push';

/**
 * Generated class for the SpeakerDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html',
})
export class SpeakerDetailPage {

  subject:any={}
  isFavourite:boolean;

  scrollingNotifications:any[]=["Welcome to NAICE 2017"]

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public subjectProvider: SubjectProvider,public pushProvider:PushProvider) {

    var context=this;

       this.pushProvider.getPublicPush().then((value)=>{
                context.scrollingNotifications=value
        })

      this.subject=this.navParams.get("speaker")
      this.subjectProvider.getFavSubjects().then(value=>{
          if(value.indexOf(this.subject.id)>-1){
              this.isFavourite=true
          }
          else{
              this.isFavourite=false;
          }
      })
  }

  ionViewDidLoad() {
    
  }

   addToFav(){
      var appContext=this;
      this.subjectProvider.addToFav(this.subject.id).then((value)=>{
          if(value){
              this.isFavourite=true;
          }
      })
  }

  removeFav(){
      this.subjectProvider.removeFav(this.subject.id).then((value)=>{
          if(value){
              this.isFavourite=false;
          }

      })
          
  }

}
