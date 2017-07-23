import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule,Http, XHRBackend, RequestOptions} from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Keyboard } from '@ionic-native/keyboard';
import {FileTransfer,FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file'
import { FileOpener } from '@ionic-native/file-opener';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';


import { MyApp } from './app.component';
import { UserProvider } from '../providers/user/user';
import { ScheduleProvider } from '../providers/schedule/schedule';
import { PaperProvider } from '../providers/paper/paper';
import { ExhibitionProvider } from '../providers/exhibition/exhibition';
import { SubjectProvider } from '../providers/subject/subject';

import {httpFactory} from "./http.factory";
import { BrochureProvider } from '../providers/brochure/brochure';
import { PostProvider } from '../providers/post/post';
import { NoteProvider } from '../providers/note/note';
import { PushProvider } from '../providers/push/push';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '809fb16a'
  },
  'push': {
    'sender_id': '31466700467',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};



@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{scrollAssist: false,autoFocusAssist: false}),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileTransfer,
    File,
    FileOpener,
    FileTransferObject,
    Keyboard,
    UserProvider,
    ScheduleProvider,
    PaperProvider,
    ExhibitionProvider,
    BarcodeScanner,
    SubjectProvider,
    {provide: Http,useFactory: httpFactory,deps: [XHRBackend, RequestOptions, Storage]},
    BrochureProvider,
    PostProvider,
    NoteProvider,
    PushProvider,
    LocalNotifications
  ]
})
export class AppModule {}
