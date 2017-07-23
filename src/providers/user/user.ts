import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Subject } from '../../models/Subject';
import { Role } from '../../models/Role';
import {Push,PushToken} from '@ionic/cloud-angular';
import { Platform} from 'ionic-angular'
import { LocalNotifications } from '@ionic-native/local-notifications';


@Injectable()
export class UserProvider {

  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_PULLED_SCHEDULE='hasPulledSchedule'
  HAS_PULLED_SUBJECT='hasPulledSubject'
  HAS_PULLED_PAPER='hasPulledPaper'
  HAS_PULLED_BROCHURE='hasPulledBrochure'
  HAS_PULLED_FILES='hasPulledFile'
  HAS_PULLED_EXHIBITION='hasPulledExhibition'
  HAS_PULLED_POST='hasPulledPost'
  HAS_PULLED_PUSH='hasPulledPush'
  HAS_PULLED_DATA='hasPulledData'
  dataLoadingStatus:String

  currentUser:any={}
  headers = new Headers();

  constructor(public http: Http,public storage: Storage,public push: Push,
  public platform:Platform,private localNotifications: LocalNotifications) {
    
  }

  login(user: Subject,callerContext): void {
        var context=this
        this.http.post('api/applogin',user)
        .timeout(20000)
        .map(res => res.json()).subscribe(data => {
            context.headers.append('X-AUTH-TOKEN',data.authToken )
            context.currentUser = data;
            context.storage.set(this.HAS_LOGGED_IN, true);
            context.setUser(context.currentUser);
            context.storage.get(this.HAS_PULLED_DATA)
            .then((hasPulledData) => {
                if (!hasPulledData) {
                    context.initDataRepo(callerContext);
                    context.storage.set("notes",[])
                    context.storage.set("favEvents",[])
                    context.storage.set("favSubjects",[])
                    context.storage.set("favExhibitors",[])
                    context.storage.set("favPapers",[])
                }
                else{
                    context.dataLoadingStatus="COMPLETED"
                    callerContext.dataLoaderIndicator.dismiss();
                }
            });
        },
        err =>{
            callerContext.dataLoaderIndicator.dismiss();
            console.log(err)
            if(err.status===400||err.status===401){
                 callerContext.presentAlert("Login Error","Invalid login credentials")
            }  
            else{
                callerContext.presentAlert("Unable to Connect","Please check internet connectivity settings and try again")
            }
        });
    
  };

  pinLogin(user: String,callerContext): void {
        var context=this
        this.dataLoadingStatus="Please wait..."
        this.http.post('api/pinlogin',user)
        .timeout(20000)
        .map(res => res.json()).subscribe(data => {
            context.headers.append('X-AUTH-TOKEN',data.authToken )
            context.dataLoadingStatus="Login successful"
            context.currentUser = data;
            context.storage.set(this.HAS_LOGGED_IN, true);
            context.setUser(this.currentUser);
            context.storage.get(this.HAS_PULLED_DATA)
            .then((hasPulledData) => {
                if (!hasPulledData) {
                    context.initDataRepo(callerContext);
                    context.storage.set("notes",[])
                    context.storage.set("favEvents",[])
                    context.storage.set("favSubjects",[])
                    context.storage.set("favExhibitors",[])
                    context.storage.set("favPapers",[])
                }
                else{
                    context.dataLoadingStatus="COMPLETED"
                }
            });
        },
        err =>{
             callerContext.dataLoaderIndicator.dismiss();
             if(err.status===400||err.status===401){
                 callerContext.presentAlert("Login Error","Invalid pin")
            }
     
            else{
                callerContext.presentAlert("Unable to Connect","Please check internet connectivity settings and try again")
            }
        });

  };

  signup(user: Subject,callerContext): void {
    var context=this;
    var role:Role={id:"",roleName:""};
    role.id="1";
    role.roleName="USER";
    user.subjectRoles=[];
    user.subjectRoles.push(role);
    this.dataLoadingStatus="Please wait..."
    this.http.post('api/register',user)
    .timeout(20000)
    .map(res => res.json()).subscribe(data => {
        context.headers.append('X-AUTH-TOKEN',data.authToken )
        context.currentUser = data;
        context.storage.set(context.HAS_LOGGED_IN, true);
        context.setUser(context.currentUser); 
        context.storage.get(context.HAS_PULLED_DATA)
        .then((hasPulledData) => {
            if (!hasPulledData) {
                context.initDataRepo(callerContext);
                context.storage.set("notes",[])
                context.storage.set("favEvents",[])
                context.storage.set("favSubjects",[])
                context.storage.set("favExhibitors",[])
                context.storage.set("favPapers",[])
            }
            else{
                callerContext.dataLoaderIndicator.dismiss();
                callerContext.navCtrl.setRoot("HomePage");
            }
        });
    },
    err =>{
            callerContext.dataLoaderIndicator.dismiss();
            if(err.status===400||err.status===401){
                 callerContext.presentAlert("Error","This email already exist, please sign in with credentials")
            }
            else{
                callerContext.presentAlert("Unable to Connect","Please check internet connectivity settings and try again")
            }
            
    });

  };


  getPassword(value,callerContext){
        this.dataLoadingStatus="Please wait..."
        this.http.get('api/retrieve/'+value.email)
        .timeout(20000)
        .map(res => res.json()).subscribe(data => {
                  callerContext.dataLoaderIndicator.dismiss();
                  callerContext.presentAlert("Info","Your login credentials have been sent to your email")      
        },err =>{
            callerContext.dataLoaderIndicator.dismiss();
            if(err.status!==500){
                if(err.status===400){
                    callerContext.presentAlert("Oops","Unable to send mail at this time, this may be from us, please check the provided mail, and try again later") 
                }
                if(err.status===401){
                    callerContext.presentAlert("Oops","Invalid email address") 
                }
            }
            else{
                   callerContext.presentAlert("Unable to Connect","Please check internet connectivity settings and try again") 
            }
        });
  }

  update(user:Subject):void{
    this.http.put('api/subject',user)
    .timeout(8000)
    .map(res => res.json()).subscribe(data => {
        this.setUser(user); 
    },
    err =>{
        console.log("Oops! "+err);
    });
  }

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('user');
  };

  setUser(user: Subject): void {
    this.storage.set('user', user);
  };

  getUser(): Promise<Subject> {
        return this.storage.get('user').then((value) => {
            return value;
        });
  };

 hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  hasPulledData(): Promise<boolean> {
    return this.storage.get(this.HAS_PULLED_DATA).then((value) => {
      return value === true;
    });
  };

 
  registerDevice(){

          if (this.platform.is('cordova')) {

              this.push.register().then((t: PushToken) => {
                return this.push.saveToken(t);
              }).then((t: PushToken) => {
                 
                });
          }

           this.push.rx.notification()
            .subscribe((msg) => {
            this.localNotifications.schedule({
                id: 1,
                title:msg.title,
                text:msg.text,
                icon: "res://icon.png"
            });
         });
  }


   initDataRepo(callerContext){

    var context=this;

    let options = new RequestOptions({ headers: context.headers });

    context.http.get('api/schedules',options)
    .timeout(30000)
    .map(res => res.json()).subscribe(data => {
        context.storage.set("schedules",data)
        context.storage.set(this.HAS_PULLED_SCHEDULE,true)


        context.http.get('api/exhibitions',options)
        .timeout(30000)
        .map(res => res.json()).subscribe(data => {
           context.storage.set("exhibitions",data)
           context.storage.set(this.HAS_PULLED_EXHIBITION,true)
                        
           context.http.get('api/papers',options)
           .timeout(30000)
           .map(res => res.json()).subscribe(data => {
               context.storage.set("papers",data)
               context.storage.set(this.HAS_PULLED_PAPER,true)
                                
               context.http.get('api/brochs',options)
               .timeout(30000)
               .map(res => res.json()).subscribe(data => {
                  context.storage.set("brochures",data)
                  context.storage.set(this.HAS_PULLED_BROCHURE,true)
                                
                  context.http.get('api/subject',options)
                  .timeout(30000)
                  .map(res => res.json()).subscribe(data => {
                      context.storage.set("subjects",data)
                      context.storage.set(this.HAS_PULLED_SUBJECT,true)

                      context.http.get('api/posts',options)
                      .timeout(30000)
                      .map(res => res.json()).subscribe(data => {
                         context.storage.set("posts",data)
                         context.storage.set(this.HAS_PULLED_POST,true)

                         context.http.get('api/private/'+context.currentUser.id,options)
                         .timeout(30000)
                         .map(res => res.json()).subscribe(data => {
                            context.storage.set("pushs",data)
                            context.storage.set(this.HAS_PULLED_PUSH,true)

                            callerContext.dataLoaderIndicator.dismiss();
                            callerContext.navCtrl.setRoot("HomePage");

                        },
                        err =>{
                            context.storage.set(this.HAS_PULLED_PUSH,false)
                            context.storage.set(this.HAS_PULLED_DATA,false)
                            callerContext.dataLoaderIndicator.dismiss();
                            callerContext.presentAlert("Unable to Connect","Please check internet connectivity settings and try again")
                            
                        });

                    },
                    err =>{
                        context.storage.set(this.HAS_PULLED_POST,false)
                        context.storage.set(this.HAS_PULLED_DATA,false)
                        callerContext.dataLoaderIndicator.dismiss();
                        callerContext.presentAlert("Unable to Connect","Please check internet connectivity settings and try again")
                        
                    });
                },
                err =>{
                        context.storage.set(this.HAS_PULLED_SUBJECT,false)
                        context.storage.set(this.HAS_PULLED_DATA,false)
                        callerContext.dataLoaderIndicator.dismiss();
                        callerContext.presentAlert("Unable to Connect","Please check internet connectivity settings and try again")
                        
                    });
                                           
            },
             err =>{
                    context.storage.set(this.HAS_PULLED_PAPER,false)
                    context.storage.set(this.HAS_PULLED_DATA,false)
                    callerContext.dataLoaderIndicator.dismiss();
                    callerContext.presentAlert("Unable to Connect","Please check internet connectivity settings and try again")
                    
            });
                           
        },
        err =>{
        context.storage.set(this.HAS_PULLED_PAPER,false)
        context.storage.set(this.HAS_PULLED_DATA,false)
        callerContext.dataLoaderIndicator.dismiss();
        callerContext.presentAlert("Unable to Connect","Please check internet connectivity settings and try again")
        
        });
                       

        },
        err =>{
            context.storage.set(this.HAS_PULLED_EXHIBITION,false)
            context.storage.set(this.HAS_PULLED_DATA,false)
            callerContext.dataLoaderIndicator.dismiss();
            callerContext.presentAlert("Unable to Connect","Please check internet connectivity settings and try again")
    
        });

     },
    err =>{
      context.storage.set(this.HAS_PULLED_SCHEDULE,false)
      context.storage.set(this.HAS_PULLED_DATA,false)
      callerContext.dataLoaderIndicator.dismiss();
      callerContext.presentAlert("Unable to Connect","Please check internet connectivity settings and try again")
      
    });
 
   }
}
