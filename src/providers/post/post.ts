import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Post } from '../../models/Post';
import { State } from '../../models/State';
import { Storage } from '@ionic/storage';

/*
  Generated class for the PostProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PostProvider {

  posts:Post[];
  state:State;

  constructor(public http: Http,public storage: Storage) {
      
  }


  updatePost(refresher,appcontext){
     var context=this;
        context.http.get('api/posts')
        .timeout(8000)
        .map(res => res.json()).subscribe(data => {
            context.getPost().then((allPosts)=>{
                allPosts=data
                context.storage.set("posts",allPosts)
            })
            appcontext.questions=[]
            appcontext.comments=[]
            data.forEach(function(thisPost, postIndex, postArray) {
                if(thisPost.eventId===appcontext.id){
                    if(thisPost.type==='Question'){
                        appcontext.questions.push(thisPost)
                    }
                    else{
                        appcontext.comments.push(thisPost)
                    } 
                }
            })
            refresher.complete()
        },err=>{
            refresher.complete()
    })
  }
  

  setPostState(state:State){
      this.storage.set('postState', state);
  }


  getPost(): Promise<Post[]>{
        return this.storage.get('posts').then((value) => {
            return value;

        });
  }
  

}
