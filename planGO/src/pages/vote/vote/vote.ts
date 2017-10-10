import { Component, OnInit } from '@angular/core';

import { NavParams, App, AlertController } from 'ionic-angular';
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
    private alertCtrl: AlertController,
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

  check(possibility, hour?) {
    if (!hour) {
      if (this.selectPoll.filter(v => v.option === possibility.option).length === 0) {
        let op = { option: possibility.option }
        this.selectPoll.push(op)
      } else {
        this.selectPoll = this.selectPoll.filter(v => v.option !== possibility.option)
      }
    } else {
      let filter = this.selectPoll.filter(v => v.option === possibility.option.date);
      if (filter.length === 0) {
        let op = { option: possibility.option.date, hour: hour }
        this.selectPoll.push(op);
      } else {
        if (filter.filter(v => v.hour === hour).length > 0) {
          let op = { option: possibility.option.date, hour: hour }
          this.selectPoll = this.selectPoll.filter(v => (v.option !== possibility.option.date || v.hour !== hour))
        } else {
          let op = { option: possibility.option.date, hour: hour }
          this.selectPoll.push(op);
        }
      }
    }
    console.log(this.selectPoll)
  }



  radio(possibility) {
    this.select = possibility;
  }

  saveCheck() {
    this.voteService.getVote(this.poll._id)
      .flatMap(oldVotes => this.prepareVote(oldVotes))
      .flatMap(newVotes => this.voteService.saveVote(newVotes, this.poll._id))
      .flatMap(val => this.voteService.saveSendVote(this.user._id, this.poll._id))
      .flatMap(val => this.pollService.deleteSendPoll(this.user._id, this.poll._id))
      .subscribe(res => {
        this.showPopup('Guardado', 'Su voto ha sido guardado correctamente')
      })
  }

  saveRadio() {
    this.selectPoll.push(this.select);

    this.voteService.getVote(this.poll._id)
      .flatMap(oldVotes => this.prepareVote(oldVotes))
      .flatMap(newVotes => this.voteService.saveVote(this.selectPoll, this.poll._id))
      .flatMap(val => this.voteService.saveSendVote(this.user._id, this.poll._id))
      .flatMap(val => this.pollService.deleteSendPoll(this.user._id, this.poll._id))
      .subscribe(res => {
        this.showPopup('Guardado', 'Su voto ha sido guardado correctamente')

      })

  }

  prepareVote(oldVotes): Observable<Vote[]> {
    var votes: Vote[] = [];
    var i = 0;
    var vote: Vote;

    this.cleanVote(oldVotes).subscribe(oldVotes => {

      for (i; i < oldVotes.options.length; i++) {

        if (oldVotes.options[i].option.date) {
          var find = this.selectPoll.find(v => (v.option.date === oldVotes.options[i].option.date && v.option.hour === oldVotes.options[i].option.hour))
        } else {
          find = this.selectPoll.find(v => v.option === oldVotes.options[i].option)
        }
        if (find) {
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
    for (i = 0; i < oldVotes.options.length; i++) {
      let index = oldVotes.options[i].votes.indexOf(this.user.name)
      if (index !== -1) {
        oldVotes.options[i].votes = oldVotes.options[i].votes.slice(0, index)
      }
    }

    return Observable.of(oldVotes)
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: _ => {
            this.navCtrl.getRootNav().push(TabsPage)
          },

        }

      ]
    });
    alert.present();
  }

}
