import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Brochure } from '../../models/Brochure';
import { State } from '../../models/State';
import { Storage } from '@ionic/storage';

/*
  Generated class for the BrochureProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BrochureProvider {

  brochures:Brochure[];

  constructor(public http: Http,public storage: Storage) {
      
  }


  updateBrochure(){
    var context=this;
    context.http.get('api/brochs').map(res => res.json()).subscribe(data => {
            context.storage.set("brochures",data)
        },err=>{
            
        })
  }


  setBrochureState(state:State){
      this.storage.set('brochureState', state);
  }

  setBrochure(brochures:Brochure[]){
      this.storage.set('brochures', brochures);
  }


  getBrochures(): Promise<Brochure[]>{
        return this.storage.get('brochures').then((value) => {
            return value;
        });
  }


  getLocalBrochures(): Promise<String[]>{
        return this.storage.get('localBrochures').then((value) => {
            return value;
        });
  }

}
