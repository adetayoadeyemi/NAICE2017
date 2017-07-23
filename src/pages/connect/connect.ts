import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubjectProvider } from '../../providers/subject/subject';
import { Subject } from '../../models/Subject';
import { PushProvider } from '../../providers/push/push';

/**
 * Generated class for the Connect page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html',
})
export class Connect {

  subjects:Subject[];
  staticSubjects:any[]=[];

   scrollingNotifications:any[]=["Welcome to NAICE 2017"]


  constructor(public navCtrl: NavController, public navParams: NavParams,
      public subjectProvider: SubjectProvider,public pushProvider:PushProvider) {
            var appContext=this
            this.pushProvider.getPublicPush().then((value)=>{
                    appContext.scrollingNotifications=value
            })
      }

  ionViewDidLoad() {
      var context=this;
      this.subjectProvider.getSubjects().then((subjects)=>{
           context.subjects=context.sortPeople(subjects)
           context.staticSubjects=context.sortPeople(subjects)
      })
    
  }

  doUpdate(refresher){
      this.subjectProvider.updateSubject(refresher,this,false);
  }


  gotoDetails(subject){
      this.navCtrl.push("ConnectdetailsPage",{subject:subject})
  }

   searchSubjects(ev: any){
    var context=this;

     context.subjects=context.staticSubjects

     let val = ev.target.value;

     if (val && val.trim() != '') {
      context.subjects =context.subjects.filter((item) => {
          var fullName=item.firstName+" "+item.lastName
        return (fullName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    
  }

  sortPeople(people):Subject[]{
      return  people.sort(function(a,b){

            if(a.firstName.toLowerCase()<b.firstName.toLowerCase()){
                
                return -1;
            }

            if(a.firstName.toLowerCase()>b.firstName.toLowerCase()){
                return 1;
            }
            return 0;
        })
  }
  

}
