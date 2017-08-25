import { Component, OnInit, ViewChild} from '@angular/core';
import { NavController, Tabs, NavParams } from 'ionic-angular';


import { PollPage } from './poll/poll';
import { SendPollPage } from './sendPoll/sendPoll';

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

    private tab2Root = PollPage;
    private tab1Root = SendPollPage;


    private i: number = 1;

    private params: any = {};

    constructor(public navCtrl: NavController,
                private navParams: NavParams) {
                    this.newPoll.type = navParams.get('type');
                }

    public ngOnInit() {

        this.move = this.move.bind(this);
        this.params = this.navParams.data;
    }

    public ionViewWillEnter() {
        this.tabRef.select(0);
    }

    private move() {

        const current = this.currentStep;
        const moveTo = current + 1;

        this.currentStep = moveTo;
        this.tabRef.select(moveTo - 1);
    }

}
