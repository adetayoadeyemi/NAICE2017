import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaperProvider } from '../../providers/paper/paper';
import { PushProvider } from '../../providers/push/push';

/**
 * Generated class for the Papers page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-papers',
  templateUrl: 'papers.html',
})
export class Papers {

  papers:any[]=[];
  isFav:boolean=false;
  fetchedFav=false;
  staticPapers:any[]=[];

  scrollingNotifications:any[]=["Welcome to NAICE 2017"]

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public paperProvider: PaperProvider,public pushProvider:PushProvider) {
      var context=this;

      this.pushProvider.getPublicPush().then((value)=>{
                context.scrollingNotifications=value
        })

      this.isFav=this.navParams.get("isFav")

      this.paperProvider.getPapers().then((papers)=>{

          if(context.isFav){
              context.paperProvider.getFavPapers().then((favPapers)=>{
                  papers.forEach(function(thisPaper, paperIndex, paperArray) {
                        if(favPapers.indexOf(thisPaper.id)>-1){
                            context.papers.push(thisPaper)
                             context.staticPapers.push(thisPaper)
                        }
                    })
              });
              
          }else{
              context.papers=papers
              context.staticPapers=papers
          }
          
      })
      this.fetchedFav=true
  }

  ionViewDidEnter(){
      var context=this;
      
      if(!context.fetchedFav){
            
            this.paperProvider.getPapers().then((papers)=>{
                if(context.isFav){
                    context.papers=[]
                    context.paperProvider.getFavPapers().then((favPapers)=>{
                        papers.forEach(function(thisPaper, paperIndex, paperArray) {
                                if(favPapers.indexOf(thisPaper.id)>-1){
                                    context.papers.push(thisPaper)
                                    context.staticPapers.push(thisPaper)
                                }
                            })
                    });
                }
                
            })
      }

      context.fetchedFav=false;
  }

  paperClicked(paper){
      this.navCtrl.push("PaperDetailPage",{paper:paper})
  }

  doUpdate(refresher){
      this.paperProvider.updatePaper(refresher,this);
  }


   searchPapers(ev: any){
    var context=this;

     context.papers=context.staticPapers

     let val = ev.target.value;

     if (val && val.trim() != '') {
      context.papers =context.papers.filter((item) => {
        return (item.topic.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    
  }

}
