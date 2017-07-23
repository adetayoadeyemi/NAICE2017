import {XHRBackend, Http, RequestOptions} from "@angular/http";
import {InterceptedHttp} from "./http.interceptor";
import { Storage } from '@ionic/storage';


export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions,storage:Storage): Http {
    return new InterceptedHttp(xhrBackend,requestOptions,storage);
}