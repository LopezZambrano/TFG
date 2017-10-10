import { Component, OnInit } from '@angular/core';


import { NavParams, App} from 'ionic-angular';

import { HomePage } from '../../../pages/home/home'
import { Poll } from '../../../shared/models/poll'




@Component({
  selector: 'page-correctPoll',
  templateUrl: 'correctPoll.html'
})
export class CorrectPollPage implements OnInit {

  constructor(public navParams: NavParams,
              public navCnt: App) { }

  private onComplete: any;
  newPoll: Poll = { title: '' };

  ngOnInit() {
    this.onComplete = this.navParams.data.onComplete;
    this.newPoll = this.navParams.data.newPoll;
  }

  send() {
    if (this.onComplete) {
      this.onComplete(-1);
    }
  }

  edit() {
    if (this.onComplete) {
      this.onComplete(-2);
    }
  }

    save() {
      this.navCnt.getRootNav().push(HomePage)
    }

  

}