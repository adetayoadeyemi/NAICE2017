import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NoteProvider } from '../../providers/note/note';



@IonicPage()
@Component({
  selector: 'page-takenote',
  templateUrl: 'takenote.html',
})
export class TakenotePage {

  @ViewChild('myInput') myInput: ElementRef;

  note:any={}
  noteForm:FormGroup;
  isEdit:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder,public noteProvider:NoteProvider) {

          this.note=this.navParams.get("note")
          this.isEdit=this.navParams.get("isEdit")

          this.noteForm = this.formBuilder.group({
              subject: [this.note.subject, Validators.required],
              body: [this.note.body,Validators.required],
              id:[this.note.id]
          });

  }

  ionViewDidLoad() {
    
  }


  takeNote(){
      this.noteProvider.addNote(this.noteForm.value).then((value)=>{
          if(value){
              this.navCtrl.pop()
          }
      })
  }

  updateNote(){
      this.noteProvider.editNote(this.noteForm.value).then((value)=>{
          if(value){
              this.navCtrl.pop()
          }
      })
  }

  resize() {
      var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      var scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }


}
