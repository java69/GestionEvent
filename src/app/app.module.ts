import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../services/auth/auth';
import {ProfileProvider} from "../services/profile/profile";
import {EventProvider} from "../services/event/event";
import {HttpModule} from "@angular/http";
import {TabsPage} from "../pages/tabs/tabs";
import {OutilsPage} from "../pages/outils/outils";
import {AidePage} from "../pages/aide/aide";
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    OutilsPage,
    AidePage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    OutilsPage,
    AidePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ProfileProvider,
    EventProvider,
    Camera
  ]
})

export class AppModule {}
