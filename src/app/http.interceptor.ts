import {Injectable} from "@angular/core";
import { ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import { Storage } from '@ionic/storage';

@Injectable()
export class InterceptedHttp extends Http {


    baseUrl:string="http://naice.herokuapp.com/"
    currentUser:any={};
    isLoggedIn:boolean;


 
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions,public storage:Storage) {
        
        super(backend, defaultOptions)

        var context=this;

        context.storage.get('hasLoggedIn')
            .then((hasLoggedIn) => {
                if (hasLoggedIn) {
                    context.storage.get("user").then((user)=>{
                        context.currentUser=user
                        context.isLoggedIn=true
                  })
                } else {
                    context.currentUser={authToken:" "}
                    context.isLoggedIn=false;
                }
            });
        
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {

        url=this.baseUrl+url
        
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {

        url=this.baseUrl+url
        
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {

        url=this.baseUrl+url
     
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {

        url=this.baseUrl+url
      
        return super.delete(url, this.getRequestOptionArgs(options));
    }
    

    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        var context=this
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
            
            if(this.isLoggedIn){
                options.headers.append('X-AUTH-TOKEN',this.currentUser.authToken );
            }else{
                 context.storage.get("user").then((user)=>{
                     if(user){
                        context.currentUser=user
                        context.isLoggedIn=true
                        options.headers.append('X-AUTH-TOKEN',context.currentUser.authToken );
                     }
                  })
            }
        }
         return options;
    }
}