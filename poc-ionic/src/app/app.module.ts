import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProfilePage } from '../pages/profile/profile';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {PollPage} from '../pages/poll/poll';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AuthService} from '../shared/services/auth-service';
import {LoginPage} from '../pages/login/login/login'

import {RegisterPage} from '../pages/login/register/register'
import{ HomePage } from '../pages/home/home'
import {Shortcut} from '../pages/home/shortcut/shortcut'

import { Header } from '../shared/component/header/header'

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    RegisterPage,
    PollPage,
    HomePage,
    Shortcut,
    Header
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    RegisterPage,
    PollPage, 
    HomePage,
    Shortcut, 
    Header
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
