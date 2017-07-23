import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { ScheduleProvider } from '../../providers/schedule/schedule';
import { Schedule } from '../../models/Schedule';
import { TimeModel } from '../../models/TimeModel';



/**
 * Generated class for the Schedules page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-schedules',
  templateUrl: 'schedules.html',
})
export class Schedules {

  shownEvent=null;
  schedules:Schedule[];
  scheduleToShow:Date;
  isFav:boolean=false;
  fetchedFav=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public scheduleProvider: ScheduleProvider,
                ) {
      var context=this;

      this.isFav=this.navParams.get("isFav")

      this.scheduleProvider.getSchedules().then((schedules)=>{

          
              context.scheduleProvider.getFavSchedules().then((favEvents)=>{
                  schedules.forEach(function(thisSchedule, scheduleIndex, scheduleArray) {
                        var currentEntryList:TimeModel[]=[];
                        thisSchedule.entries.forEach(function(thisEntry, entryIndex, entryArray) {
                            var currentEntry:TimeModel=thisEntry;
                            thisEntry.events.forEach(function(thisEvent, eventIndex, eventsArray) {
                                var index=currentEntry.events.indexOf(thisEvent)
                                if(favEvents.indexOf(thisEvent.id)<0){
                                      if(context.isFav){ 
                                        currentEntry.events.splice(index)
                                      }  
                                }
                                else{
                                      currentEntry.events[index].fav=2
                                }
                            })
                            if(currentEntry.events.length>0){
                                currentEntryList.push(currentEntry)
                            }
                        })

                        thisSchedule.entries=currentEntryList
                    })
              });
          
          context.schedules=schedules
          context.scheduleToShow=context.schedules[0].day
      })

      
      this.fetchedFav=true
  }

  
  toggleEvent(event) {
    if (this.shownEvent===event) {
        this.shownEvent = null;
    } else {
        this.shownEvent = event;
    }
    
};


  doUpdate(refresher){
      this.scheduleProvider.updateSchedule(refresher,this);
  }


  scheduleTapped(day){
    this.scheduleToShow=day;
  }

  joinConversation(event){
      this.navCtrl.push("EventDetailPage",{id:event.id})
  }


  addToFav(event){
        this.scheduleProvider.addToFav(event.id).then((value)=>{
            if(value){
                event.fav=2
            }
        })
  }

  removeFav(event){
      this.scheduleProvider.removeFav(event.id).then((value)=>{
          if(value){
              event.fav=1
          }
      })
  }


getSchedules(event){
    
}

goToNotifications(){
    this.navCtrl.push('NotificationsPage');
}

}
