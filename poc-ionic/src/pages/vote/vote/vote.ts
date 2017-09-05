import { Component, OnInit } from '@angular/core';

import { NavParams, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Poll } from '../../../shared/models/poll'
import { User } from '../../../shared/models/user'
import { Vote } from '../../../shared/models/vote'

import { VoteService } from '../../../shared/services/vote-service'
import { PollService } from '../../../shared/services/poll-service'
import { AuthService } from '../../../shared/services/auth-service'

import { TabsPage } from '../../vote/tabs'


@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html'
})
export class VotePage implements OnInit {

  poll: Poll;
  oneVote: boolean;
  selectPoll: any[] = [];
  select: string;
  user: User;

  text: boolean = false;


  constructor(public navCtrl: App,
    public voteService: VoteService,
    public pollService: PollService,
    public authService: AuthService,
    public navParams: NavParams) {
    this.poll = this.navParams.get('poll')
  }

  ngOnInit() {
    if (this.poll.type === "texto") {
      this.text = true;
    }
    this.authService.getUser().subscribe(user => this.user = user);
  }

  check(possibility) {
    if (this.selectPoll.indexOf(possibility.option) === -1) {
      this.selectPoll.push(possibility.option)
    } else {
      this.selectPoll = this.selectPoll.filter(v => v !== possibility.option)
    }
  }



  radio(possibility) {
    this.select = possibility;
  }

  saveCheck() {
    this.voteService.getVote(this.poll._id)
      .flatMap(oldVotes => this.prepareVote(oldVotes, this.selectPoll))
      .flatMap(newVotes => this.voteService.saveVote(newVotes, this.poll._id, this.poll))
      .flatMap(val => this.voteService.saveSendVote(this.user._id, this.poll._id))
      .flatMap(val => this.pollService.deleteSendPoll(this.user._id, this.poll._id))
      .subscribe(res => this.navCtrl.getRootNav().push(TabsPage))
  }

  saveRadio() {
    this.selectPoll.push(this.select);

    this.voteService.getVote(this.poll._id)
      .flatMap(oldVotes => this.prepareVote(oldVotes, this.selectPoll))
      .flatMap(newVotes => this.voteService.saveVote(newVotes, this.poll._id, this.poll))
      .flatMap(val => this.voteService.saveSendVote(this.user._id, this.poll._id))
      .flatMap(val => this.pollService.deleteSendPoll(this.user._id, this.poll._id))
      .subscribe(res => this.navCtrl.getRootNav().push(TabsPage))

  }

  prepareVote(oldVotes, options: string[]): Observable<Vote[]> {
    var votes: Vote[] = [];
    var i = 0;
    var vote: Vote;

    this.cleanVote(oldVotes).subscribe(oldVotes => {
      for (i; i < oldVotes.options.length; i++) {

        if (this.selectPoll.find(v => v === oldVotes.options[i].option)) {
          if (oldVotes.options[i].votes.find(v => v !== this.user.name)) {
            oldVotes.options[i].votes.push(this.user.name)
            vote = { 'option': oldVotes.options[i].option, 'votes': oldVotes.options[i].votes }
          } else {
            vote = { 'option': oldVotes.options[i].option, 'votes': oldVotes.options[i].votes }
          }
        } else {
          vote = { 'option': oldVotes.options[i].option, 'votes': oldVotes.options[i].votes }
        }

        votes.push(vote);
      }
    })

    return Observable.of(votes);
  }

  cleanVote(oldVotes) {
    let i;
    for (i=0; i < oldVotes.options.length; i++) {
      let index = oldVotes.options[i].votes.indexOf(this.user.name)
      if (index !== -1){
        oldVotes.options[i].votes = oldVotes.options[i].votes.slice(0, index)
      }

    }

    return Observable.of(oldVotes)
  }

}
