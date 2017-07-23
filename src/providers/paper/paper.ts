import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Paper } from '../../models/Paper';
import { State } from '../../models/State';
import { Storage } from '@ionic/storage';

/*
  Generated class for the PaperProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PaperProvider {

  papers:Paper[];
  state:State;


  constructor(public http: Http,public storage: Storage) {
     
  }


  updatePaper(refresher,appcontext){
    var context=this;
        context.http.get('api/papers')
        .timeout(8000)
        .map(res => res.json()).subscribe(data => {
            context.storage.set("papers",data)
            appcontext.papers=data
            refresher.complete()
        },err=>{
            refresher.complete()
        })
  }

  setPaperState(state:State){
      this.storage.set('paperState', state);
  }


  getPapers(): Promise<Paper[]>{
        return this.storage.get('papers').then((value) => {
            return value;
        });
  }

  getFavPapers(): Promise<String[]>{
        return this.storage.get('favPapers').then((value) => {
            return value;
        });
  }

  addToFav(id):Promise<boolean>{
      var appContext=this;
      return this.storage.get("favPapers").then((value)=>{
            value.push(id)
            appContext.storage.set("favPapers",value)
            return true;
      })   
  }

  removeFav(id):Promise<boolean>{
        var index;
        return this.storage.get('favPapers').then((value) => {
           value.forEach(function(thisFav, favIndex, favArray) {
               if(thisFav===id){
                    index=favIndex;
               }
           })
           value.splice(index,1)
           this.storage.set("favPapers",value);
           return true;
       });
  }

}
