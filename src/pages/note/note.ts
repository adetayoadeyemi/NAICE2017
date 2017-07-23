import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoteProvider } from '../../providers/note/note';

/**
 * Generated class for the NotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
})
export class NotePage {

   notes:any[]=[];
   notesFetched:boolean=false;
   shownNote=null;

  constructor(public navCtrl: NavController, public navParams: NavParams,public noteProvider:NoteProvider) {

  }

  ionViewDidLoad(){
      var context=this;
      this.noteProvider.getNotes().then((notes)=>{
          context.notes=notes
      })
      this.notesFetched=true;
  }

  ionViewDidEnter() {

    if(!this.notesFetched){
        var context=this;
        this.noteProvider.getNotes().then((notes)=>{
            context.notes=notes
        })

    }

    
    
  }

  ionViewWillLeave(){
    this.notesFetched=false;
  }


  addNote(note){
      this.navCtrl.push("TakenotePage",{note:{subject:'',body:''},isEdit:false})
  }


  editNote(note){
      this.navCtrl.push("TakenotePage",{note:note,isEdit:true})
  }

  deleteNote(note){
    var index
    this.noteProvider.deleteNote(note).then((value)=>{
        if(value){
            this.notes.forEach(function(thisNote, noteIndex, noteArray) {
                if(thisNote.id===note.id){
                    index=noteIndex;
                }
            })
            this.notes.splice(index,1)
        }
        else{
            console.log("unable to delete")
        }
        
    });
  }


  toggleNote(note) {

    if (this.shownNote===note) {
        this.shownNote = null;
    } else {
        this.shownNote = note;
    }
    
};

  

}
