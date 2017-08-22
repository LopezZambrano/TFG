import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Network } from '@ionic-native/network';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {LoginPage} from '../pages/login/login/login'
import { ProfilePage } from '../pages/profile/profile';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { PollPage } from '../pages/poll/poll';
import { DetailPollPage } from '../pages/list/detail/detail'
import { RegisterPage } from '../pages/login/register/register'
import{ HomePage } from '../pages/home/home'
import { Shortcut } from '../pages/home/shortcut/shortcut'
import { VotePage } from '../pages/vote/vote'
import { MyFriendsPage } from '../pages/my-friends/my-friends'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AuthService} from '../shared/services/auth-service';
import { HttpCustomService } from '../shared/services/http-custom.service';
import { ErrorService } from '../shared/services/error.service';
import { PollService } from '../shared/services/poll-service';
import { VoteService } from '../shared/services/vote-service'
import { FriendService } from '../shared/services/friend-service';
import { CommonService } from '../shared/services/common'
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
    Header,
    DetailPollPage,
    VotePage,
    MyFriendsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    Header,
    DetailPollPage,
    VotePage,
    MyFriendsPage
  ],
  providers: [
    Network,
    StatusBar,
    SplashScreen,
    AuthService,
    PollService,
    HttpCustomService,
    ErrorService,
    VoteService,
    CommonService,
    FriendService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
