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
  votes = []
  typeText: boolean;
  hour = [];

  userVote = [];

  nVotes: number[] = [];
  maxVotes = [];

  constructor(public navCtrl: NavController,
    public voteService: VoteService,
    public navParams: NavParams) {
    this.poll = this.navParams.get('poll')
  }

  ngOnInit() {

    this.typeText = false;
    if (this.poll.type === 'texto') {
      this.typeText = true;
    }
    this.voteService.getVote(this.poll._id).subscribe(res => {
      this.votes = res.options;
      let i;
      for (i = 0; i < this.votes.length; i++) {
        this.nVotes.push(0);
      }
      this.prepareVotes();
      this.getMaxVotes();
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
          if (this.userVote.filter(user => user.name == v[n]).length === 0) {
            user = { 'name': v[n], 'votes': this.searchVote(v[n]) }
            this.userVote.push(user);
          }
        }
      }
    }
  }

  searchVote(name) {
    let votes = [];
    let i;
    for (i = 0; i < this.votes.length; i++) {
      if (this.votes[i].votes.indexOf(name) === -1) {
        votes.push('')
        this.nVotes[i] = (this.nVotes[i] + 0);
      } else {
        votes.push('X')
        this.nVotes[i] = (this.nVotes[i] + 1);
      }
    }

    return votes;
  }


  onNotify(day) {
    this.hour = []
    console.log(day)
    let i;
    for (i = 0; i < this.votes.length; i++) {
      let date: Date = new Date(this.votes[i].option.date);
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate(),0,0)
      let vote = date.getTime() === day.getTime()
      if (vote){
        this.hour.push(this.votes[i].option.hour)
      }
    }
    console.log(this.hour)

  }

  getMaxVotes() {
    /* function getMaxOfArray(numArray) {
       return Math.max.apply(null, numArray);
     }
 
     let allVotes = this.votes;
 
     let num = getMaxOfArray(this.nVotes);
 
 
     let votesMax = this.nVotes.filter(v => v === num);
 
     let i;
     for (i = 0; i < votesMax.length; i++) {
       let index = allVotes.filter(v=> v.) 
 
     }    
 
     this.maxVotes.push(this.votes[i])
 console.log(this.maxVotes)*/
  }



}
