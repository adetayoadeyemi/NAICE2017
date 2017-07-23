import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Exhibition } from '../../models/Exhibition';
import { State } from '../../models/State';
import { Storage } from '@ionic/storage';



@Injectable()
export class ExhibitionProvider {

  exhibitions:Exhibition[];

  constructor(public http: Http,public storage: Storage) {
      
  }


  updateExhibition(refresher,appcontext){
     var context=this;
     context.http.get('api/exhibitions')
     .timeout(8000)
     .map(res => res.json()).subscribe(data => {
            context.storage.set("exhibitions",data)
            appcontext.exhibitions=data
            refresher.complete()
    },err=>{
            refresher.complete()
    })
  }


  setExhibitionState(state:State){
      this.storage.set('exhibitionState', state);
  }


  getExhibitions(): Promise<Exhibition[]>{
        return this.storage.get('exhibitions').then((value) => {
            return value;
        });
  }

  getFavExhibitions(): Promise<String[]>{
        return this.storage.get('favExhibitors').then((value) => {
            return value;
        });
  }

  addToFav(id):Promise<boolean>{
      var appContext=this;
      return this.storage.get("favExhibitors").then((value)=>{
            value.push(id)
            appContext.storage.set("favExhibitors",value)
            return true;
      })   
  }

  removeFav(id):Promise<boolean>{
        var index;
        return this.storage.get('favExhibitors').then((value) => {
           value.forEach(function(thisFav, favIndex, favArray) {
               if(thisFav===id){
                    index=favIndex;
               }
           })
           value.splice(index,1)
           this.storage.set("favExhibitors",value);
           return true;
       });
  }


}
