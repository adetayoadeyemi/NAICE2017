import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostProvider } from '../../providers/post/post';

/**
 * Generated class for the EventDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  id:any
  control:any="Comment"
  questions:any[]=new Array();
  comments:any[]=new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams,public postProvider: PostProvider) {
      this.id=this.navParams.get("id")
  }

  ionViewDidLoad() {
      var context=this;
      this.postProvider.getPost().then((post)=>{
          post.forEach(function(thisPost, postIndex, postArray) {
                if(thisPost.eventId===context.id){
                    if(thisPost.type==='Question'){
                         context.questions.push(thisPost)
                    }
                    else{
                        context.comments.push(thisPost)
                    } 
                }
            })
      })
  }


  doUpdate(refresher){
      this.postProvider.updatePost(refresher,this);
  }

  createPost(){
      this.navCtrl.push("CreatepostPage",{eventId:this.id})
  }

}
