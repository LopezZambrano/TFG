import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { App, NavController, MenuController } from 'ionic-angular';

import { ProfilePage } from '../../../pages/profile/profile'
import { ListPage } from '../../../pages/list/list'
import { MyFriendsPage } from '../../../pages/my-friends/my-friends'
import { LoginPage } from '../../../pages/login/login/login'
import { NewPollPage } from '../../../pages/newPoll/newPoll'
import { TabsPage } from '../../../pages/vote/tabs'

import { AuthService } from '../../services/auth-service'



@Component({
    selector: 'menu',
    templateUrl: 'menu.html',
})
export class Menu implements OnInit {

    private navCtrl: NavController;

    constructor(public app: App,
        public menuCtrl: MenuController,
        public authService: AuthService,
        public ref: ChangeDetectorRef,
        private changeDetector: ChangeDetectorRef) {
        this.menuCtrl.swipeEnable(false);
        this.navCtrl = this.app.getActiveNav();
    }

    public ngOnInit() {

        this.navCtrl = this.app.getActiveNav();
    }

    public navTo(id: string) {
        switch (id) {
            case 'profile':
                this.navCtrl.push(ProfilePage);
                break;
            case 'list':
                this.navCtrl.push(ListPage);
                break;
            case 'friends':
                this.navCtrl.push(MyFriendsPage);
                break;
            case 'login':
                this.authService.logout();
                this.navCtrl.push(LoginPage);
                break;
            case 'newPoll':
                this.navCtrl.push(NewPollPage);
                break;
            case 'vote':
                this.navCtrl.push(TabsPage);
                break;
        }

        this.menuCtrl.close();

    }


}
