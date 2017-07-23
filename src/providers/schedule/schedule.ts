import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Schedule } from '../../models/Schedule';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ScheduleProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ScheduleProvider {

  schedules:Schedule[];
  
  constructor(public http: Http,public storage: Storage) {
      
  }


  updateSchedule(refresher,appcontext){
        var context=this;
        context.http.get('api/schedules')
        .timeout(8000)
        .map(res => res.json()).subscribe(data => {
            context.storage.set("schedules",data)
            appcontext.schedules=data
            refresher.complete()
        },err=>{
            refresher.complete()
        })
    
  }

  getSchedules(): Promise<Schedule[]>{
        return this.storage.get('schedules').then((value) => {
            return value;
        });
  }

  getFavSchedules(): Promise<String[]>{
        return this.storage.get('favEvents').then((value) => {
            return value;
        });
  }

  addToFav(id):Promise<boolean>{
      var appContext=this;
      return this.storage.get("favEvents").then((value)=>{
            value.push(id)
            appContext.storage.set("favEvents",value)
            return true;
      })   
  }

  removeFav(id):Promise<boolean>{
        var index;
        return this.storage.get('favEvents').then((value) => {
           value.forEach(function(thisFav, favIndex, favArray) {
               if(thisFav===id){
                    index=favIndex;
               }
           })
           value.splice(index,1)
           this.storage.set("favEvents",value);
           return true;
       });
  }


  

 
}
