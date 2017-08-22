import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Poll } from '../../shared/models/poll'
import { User } from '../../shared/models/user'
import { Vote } from '../../shared/models/vote'

import { VoteService } from '../../shared/services/vote-service'
import { AuthService } from '../../shared/services/auth-service'


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


  constructor(public navCtrl: NavController,
    public voteService: VoteService,
    public authService: AuthService,
    public navParams: NavParams) {
    this.poll = this.navParams.get('poll')
  }

  ngOnInit() {
    console.log(this.poll)
    if (this.poll.type === "texto") {
      this.text = true;
    }
    this.authService.getUser().subscribe(user=> this.user = user);
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
      .subscribe(val => console.log('voto guardado', val))
  }

  saveRadio() {
    this.selectPoll.push(this.select);

    this.voteService.getVote(this.poll._id)
      .flatMap(oldVotes => this.prepareVote(oldVotes, this.selectPoll))
      .flatMap(newVotes => this.voteService.saveVote(newVotes, this.poll._id, this.poll))
      .subscribe(val => console.log('voto guardado', val))
  }

  prepareVote(oldVotes, options: string[]): Observable<Vote[]> {
    var votes: Vote[] = [];
    var i = 0;
    var vote: Vote;
    for (i; i < oldVotes[0].options.length; i++) {
      
      if (this.selectPoll.find(v => v === oldVotes[0].options[i].option)) {
        if (oldVotes[0].options[i].votes.find(v => v !== this.user.name)) {
          oldVotes[0].options[i].votes.push(this.user.name)
          vote = { 'option': oldVotes[0].options[i].option, 'votes': oldVotes[0].options[i].votes }
        } else {
          vote = { 'option': oldVotes[0].options[i].option, 'votes': oldVotes[0].options[i].votes }
        }
      } else {
        vote = { 'option': oldVotes[0].options[i].option, 'votes': oldVotes[0].options[i].votes }
      }

      votes.push(vote);
    }

    return Observable.of(votes);
  }

}
