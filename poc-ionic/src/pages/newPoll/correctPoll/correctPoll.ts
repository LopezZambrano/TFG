import { Component, OnInit } from '@angular/core';


import { NavController, NavParams, App } from 'ionic-angular';

import { MyFriendsPage } from '../../../pages/my-friends/my-friends'

import { User } from '../../../shared/models/user'
import { Poll } from '../../../shared/models/poll'
import { AuthService } from '../../../shared/services/auth-service'
import { PollService } from '../../../shared/services/poll-service'
import { FriendService } from '../../../shared/services/friend-service'



@Component({
  selector: 'page-correctPoll',
  templateUrl: 'correctPoll.html'
})
export class CorrectPollPage implements OnInit {

  constructor(public authService: AuthService,
    public pollService: PollService,
    public friendService: FriendService,
    public navParams: NavParams,
    public navCnt: App) { }

    private onComplete: any;
    newPoll: Poll = { title: '' };

    ngOnInit(){
      this.onComplete = this.navParams.data.onComplete;
      this.newPoll = this.navParams.data.newPoll;
    }

}