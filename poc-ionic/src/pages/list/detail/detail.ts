import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Poll } from '../../../shared/models/poll'



@Component({
  selector: 'page-detail-poll',
  templateUrl: 'detail.html'
})
export class DetailPollPage implements OnInit{

poll: Poll;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
                this.poll = this.navParams.get('poll')
              }

  ngOnInit(){
    console.log(this.poll)
  }



}
