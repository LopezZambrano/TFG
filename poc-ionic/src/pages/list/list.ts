import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Poll } from '../../shared/models/poll' 

import { DetailPollPage } from './detail/detail'

import { PollService } from '../../shared/services/poll-service'
import { AuthService } from '../../shared/services/auth-service'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit{

  polls: Poll[] = [];
  votes = {'name': "Maria"}

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public pollService: PollService,
              public authService: AuthService) {}

  ngOnInit(){
    this.authService.getUser()
    .flatMap(user=> this.pollService.getPolls(user._id))
    .subscribe(
      res=>{
        this.polls = res;
      },
      err=>{
        console.log(err)
      })
  }

  showMore(poll){
    this.navCtrl.push(DetailPollPage, {"poll": poll});
  }

}
