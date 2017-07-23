import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from '../../models/Subject';
import { State } from '../../models/State';
import { Storage } from '@ionic/storage';

/*
  Generated class for the SubjectProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SubjectProvider {

  subjects:Subject[];
  state:State;

  constructor(public http: Http,public storage: Storage) {
     
  }


   updateSubject(refresher,appcontext,isSpeakers){
    var context=this;
   
    context.http.get('api/subject')
    .timeout(8000)
    .map(res => res.json()).subscribe(data => {
            context.storage.set("subjects",data)
            if(isSpeakers){
               appcontext.speakers=[]
               data.forEach(function(thisSubject, subjectIndex, subjectArray) {
                        thisSubject.subjectRoles.forEach(function(thisRole, roleIndex, roleArray) {
                            if(thisRole.roleName==="SPEAKER"){
                                appcontext.speakers.push(thisSubject) 
                            }
                        })    
                  })   
            }
            else{
                appcontext.subjects=appcontext.sortPeople(data)
            }
            refresher.complete()
        },err=>{
            refresher.complete()
        })

  }

  setSubjectState(state:State){
      this.storage.set('subjectState', state);
  }


  getSubjects(): Promise<Subject[]>{
        return this.storage.get('subjects').then((value) => {
            return value;
        });
  }

  getFavSubjects(): Promise<String[]>{
        return this.storage.get('favSubjects').then((value) => {
            return value;
        });
  }

  addToFav(id):Promise<boolean>{
      var appContext=this;
      return this.storage.get("favSubjects").then((value)=>{
            value.push(id)
            appContext.storage.set("favSubjects",value)
            return true;
      })   
  }

  removeFav(id):Promise<boolean>{
        var index;
        return this.storage.get('favSubjects').then((value) => {
           value.forEach(function(thisFav, favIndex, favArray) {
               if(thisFav===id){
                    index=favIndex;
               }
           })
           value.splice(index,1)
           this.storage.set("favSubjects",value);
           return true;
       });
  }

}
