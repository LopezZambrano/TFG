import { Component, OnInit, ViewChild} from '@angular/core';
import { NavController, Tabs, NavParams } from 'ionic-angular';


import { PollPage } from './poll/poll';
import { SendPollPage } from './sendPoll/sendPoll';
import { CorrectPollPage } from './correctPoll/correctPoll'

import { Poll } from '../../shared/models/poll'



import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'page-newPoll',
    templateUrl: 'newPoll.html',
})
export class NewPollPage implements OnInit {

    @ViewChild('myTabs') public tabRef: Tabs;

    private newPoll: Poll = {'title':''};

    private currentStep: number = 1;

    private tab1Root = PollPage;
    private tab2Root = SendPollPage;
    private tab3Root = CorrectPollPage;


    private i: number = 1;

    private params: any = {};

    constructor(public navCtrl: NavController,
                private navParams: NavParams) {
                    this.newPoll.type = navParams.get('type');
                }

    public ngOnInit() {
        this.move = this.move.bind(this);
    }

    public ionViewWillEnter() {
        this.tabRef.select(0);
        this.currentStep = 1;
    }

     private move(step) {

        const current = this.currentStep;

        const moveTo = current + step;

        this.currentStep = moveTo;

        this.tabRef.select(moveTo - 1);
    }

}
