import { Component, OnInit, ViewChild} from '@angular/core';
import { NavController, Tabs, NavParams } from 'ionic-angular';



import { ListPollPage } from '../vote/listPoll/listPoll';

import { AuthService } from '../../shared/services/auth-service'
import { PollService } from '../../shared/services/poll-service'
import { VoteService } from '../../shared/services/vote-service'


import { Poll } from '../../shared/models/poll'



import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage implements OnInit {

    @ViewChild('myTabs') public tabRef: Tabs;

    private pollPending: Poll[] = [];
    private pollSend: Poll[] = [];

    private tab1Root = ListPollPage;
    private tab2Root = ListPollPage;

    
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public voteService: VoteService,
              public pollService: PollService,
              public authService: AuthService) {}




    ngOnInit(){

    this.authService.getUser()
    .flatMap(user=> this.voteService.getPendingVote(user._id))
    .subscribe(
      idPolls=>{
           this.pollService.getAllPolls().subscribe(all => {
          let i;
          for (i = 0; i < idPolls.length; i++) {
            let poll;
            poll = (all.filter(poll => poll._id === idPolls[i]))
            this.pollPending.push(poll[0])
          }
        })
      },
      err=>{
        console.log(err)
      })

    this.authService.getUser()
    .flatMap(user=> this.voteService.getSendVote(user._id))
    .subscribe(
      idPolls=>{
        this.pollService.getAllPolls().subscribe(all => {
          let i;
          for (i = 0; i < idPolls.length; i++) {
            let poll;
            poll = (all.filter(poll => poll._id === idPolls[i]))
            this.pollSend.push(poll[0])
          }
        })
      },
      err=>{
        console.log(err)
      })

    }
}