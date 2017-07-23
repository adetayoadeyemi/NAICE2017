import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PushModel } from '../../models/PushModel';
import { State } from '../../models/State';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';



@Injectable()
export class PushProvider {

  pushs:PushModel[];
  state:State;
  currentUser:any={}

  constructor(public http: Http,public storage: Storage,private localNotifications: LocalNotifications) {
      var context=this
      this.storage.get("user").then((value)=>{
            context.currentUser=value
      })
  }


 updatePush(refresher,appcontext,isNotification){
    var context=this;
    var oldPushIds=[];
    var oldPush=[];

    context.getPush().then((push)=>{
        oldPush=push
        push.forEach(function(thisPush, pushIndex, pushArray) {
                oldPushIds.push(thisPush.id)
        });

        if(typeof context.currentUser.id!!=='undefined'){

    
                context.http.get('api/private/'+context.currentUser.id)
                .timeout(8000)
                .map(res => res.json()).subscribe(data => {
                
                    if(typeof data!=='undefined'){
                        data.forEach(function(thisPush, pushIndex, pushArray) {
                                if(oldPushIds.indexOf(thisPush.id)<0){
                                    oldPush.push(thisPush)
                                }
                        });
                    }
                    context.storage.set("pushs",oldPush)

                    if(isNotification){
                        refresher.complete()
                        appcontext.pushs=oldPush

                        if(oldPush.length>oldPushIds.length){
                            appcontext.pushs.reverse();
                        }
                        
                    }
                    else{
                        if(oldPush.length>oldPushIds.length){
                                this.localNotifications.schedule({
                                id: 1,
                                text: "You have "+String(oldPush.length-oldPushIds.length)+" new Notification(s)",
                                icon: "res://icon.png"
                                });
                        }
                    }
                    
                },err=>{
                    if(isNotification){
                        refresher.complete()
                    }
                })

        }
        
    }) 
  }


  setPushState(state:State){
      this.storage.set('pushState', state);
  }


  getPush(): Promise<PushModel[]>{
        return this.storage.get('pushs').then((value) => {
            return value;
        });
  }

  getPublicPush():Promise<any[]>{
      var publicPush:any[]=["Welcome to NAICE 2017"];
      return this.storage.get('pushs').then((value) => {
            value.forEach(function(thisPush, pushIndex, pushArray) {
                if(thisPush.fromID==="1"){
                    publicPush.push(thisPush.subject)
                }
            });
            return publicPush;
      });
  }


   deleteMessage(id):Promise<PushModel[]>{
        var index;
        return this.storage.get('pushs').then((value) => {
           value.forEach(function(thisPush, pushIndex, pushArray) {
               if(thisPush.id===id){
                    index=pushIndex;
               }
           })
           value.splice(index,1)
           this.storage.set("pushs",value);
           return value;
       });
  }



}
