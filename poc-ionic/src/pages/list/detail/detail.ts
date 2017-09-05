import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Poll } from '../../../shared/models/poll'
import { VoteService } from '../../../shared/services/vote-service'



@Component({
  selector: 'page-detail-poll',
  templateUrl: 'detail.html'
})
export class DetailPollPage implements OnInit {

  poll: Poll;
  votes = [{ 'option': '', 'votes': [''] }]
  typeText: boolean;

  userVote = [] ;

  constructor(public navCtrl: NavController,
    public voteService: VoteService,
    public navParams: NavParams) {
    this.poll = this.navParams.get('poll')
  }

  ngOnInit() {
    
    this.typeText = false;
    if (this.poll.type === 'text'){
      this.typeText = true;
    }
    this.voteService.getVote(this.poll._id).subscribe(res => {
      this.votes = res.options;
      this.prepareVotes()
    })

  }

  prepareVotes() {
    let n;
    let i;
    let user;
    for (i = 0; i < this.votes.length; i++) {
      let v;
      v = this.votes[i].votes;
      if (v.length > 1) {
        for (n = 1; n < v.length; n++) {
          if (this.userVote.filter(user=> user.name == v[n]).length === 0) {
            user = { 'name': v[n], 'votes': this.searchVote(v[n])}
            this.userVote.push(user);
          }
        }
      }
    }
    console.log(this.userVote)
  }

  searchVote(name){
    let votes = [];
    let i;
    for (i = 0; i < this.votes.length; i++) {
      if (this.votes[i].votes.indexOf(name) === -1){
        votes.push('')
      } else{
        votes.push('X')
      }
    }
    return votes;
  }



}
