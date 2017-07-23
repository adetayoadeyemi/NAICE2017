import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubjectProvider } from '../../providers/subject/subject';
import { Subject } from '../../models/Subject';
import { PushProvider } from '../../providers/push/push';

/**
 * Generated class for the Speakers page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html',
})
export class Speakers {

  speakers:Subject[]=[];
  isFav:boolean=false;
  fetchedFav=false;
  staticSpeakers:any[]=[];

  scrollingNotifications:any[]=["Welcome to NAICE 2017"]

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public subjectProvider: SubjectProvider,public pushProvider:PushProvider) {
      
       var context=this;

       this.pushProvider.getPublicPush().then((value)=>{
                context.scrollingNotifications=value
        })

       this.isFav=this.navParams.get("isFav")

       this.subjectProvider.getSubjects().then((subjects)=>{
                  subjects.forEach(function(thisSubject, subjectIndex, subjectArray) {
                        thisSubject.subjectRoles.forEach(function(thisRole, roleIndex, roleArray) {
                            if(thisRole.roleName==="SPEAKER"){
                                if(context.isFav){
                                    context.subjectProvider.getFavSubjects().then((favSpeakers)=>{
                                        if(favSpeakers.indexOf(thisSubject.id)>-1){
                                            context.speakers.push(thisSubject) 
                                            context.staticSpeakers.push(thisSubject)
                                        }
                                    });
                                }
                                else{
                                   context.speakers.push(thisSubject) 
                                   context.staticSpeakers.push(thisSubject)
                                   
                                }
                            }
                        })    
                  })   
      })
      this.fetchedFav=true
     
  }


    ionViewDidEnter(){
      var context=this;
      
      if(!context.fetchedFav){
            if(context.isFav){
                    context.speakers=[]
                    this.subjectProvider.getSubjects().then((subjects)=>{
                        subjects.forEach(function(thisSubject, subjectIndex, subjectArray) {
                                thisSubject.subjectRoles.forEach(function(thisRole, roleIndex, roleArray) {
                                    if(thisRole.roleName==="SPEAKER"){
                                        
                                            context.subjectProvider.getFavSubjects().then((favSpeakers)=>{
                                                if(favSpeakers.indexOf(thisSubject.id)>-1){
                                                    context.speakers.push(thisSubject) 
                                                    context.staticSpeakers.push(thisSubject)
                                                }
                                            });
                                        
                                    }
                                })    
                        })   
                    })
            }

      }

      context.fetchedFav=false;
  }

  


  doUpdate(refresher){
      this.subjectProvider.updateSubject(refresher,this,true);
  }

  toProfile(speaker){
      this.navCtrl.push("SpeakerDetailPage",{speaker:speaker})
  }


  searchSpeakers(ev: any){
    var context=this;

     context.speakers=context.staticSpeakers

     let val = ev.target.value;

     if (val && val.trim() != '') {
      context.speakers =context.speakers.filter((item) => {
        var fullName=item.firstName+" "+item.lastName
        return (fullName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    
  }

}
