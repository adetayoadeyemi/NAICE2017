import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Note } from '../../models/Note';
import { Storage } from '@ionic/storage';

/*
  Generated class for the NoteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NoteProvider {

  notes:Note[];

  constructor(public storage: Storage) {
      this.storage.get('notes').then((value) => {
          this.notes=value;
      });
  }


  addNote(newNote:Note):Promise<boolean>{
      return this.storage.get('notes').then((value) => {
           newNote.id=new Date().getUTCMilliseconds()
           newNote.creationDate=new Date()
           value.unshift(newNote) 
           this.storage.set("notes",value);
           return true;
      }); 
      
  }


  editNote(note):Promise<boolean>{
      var index;
      return this.storage.get('notes').then((value) => {
           value.forEach(function(thisNote, noteIndex, noteArray) {
                if(thisNote.id===note.id){
                    index=noteIndex;     
                }
           })
           note.creationDate=new Date()
           value[index]=note
           this.storage.set("notes",value)
           return true;
      });
  }

  deleteNote(note):Promise<boolean>{

        var index;
        return this.storage.get('notes').then((value) => {
           value.forEach(function(thisNote, noteIndex, noteArray) {
               if(thisNote.id===note.id){
                    index=noteIndex;
               }
           })
           value.splice(index,1)
           this.storage.set("notes",value);
           return true;
       });
 }


  


  getNotes(): Promise<Note[]>{
      return this.storage.get('notes').then((value) => {
            return value;
        }); 
  }


}
  


