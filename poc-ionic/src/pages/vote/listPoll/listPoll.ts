import { Component, OnInit } from '@angular/core';

import { App, NavParams } from 'ionic-angular';

import { Poll } from '../../../shared/models/poll' 

import { VotePage } from '../../vote/vote/vote'

import { PollService } from '../../../shared/services/poll-service'
import { AuthService } from '../../../shared/services/auth-service'
import { VoteService } from '../../../shared/services/vote-service'

@Component({
  selector: 'page-listPoll',
  templateUrl: 'listPoll.html'
})
export class ListPollPage implements OnInit{

  polls: Poll[] = [];
  votes = {'name': "Maria"}
  pending: boolean = true;

  constructor(public navCtrl: App, 
              public navParams: NavParams,
              public voteService: VoteService,
              public pollService: PollService,
              public authService: AuthService) {}

  ngOnInit(){
    this.polls = this.navParams.data.poll;
    this.pending = this.navParams.data.pending;
  
  }

  showMore(poll){
    this.navCtrl.getRootNav().push(VotePage, {"poll": poll});
  }

}
