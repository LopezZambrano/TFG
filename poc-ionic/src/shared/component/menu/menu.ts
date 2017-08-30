import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { App, NavController, MenuController } from 'ionic-angular';

import { ProfilePage } from '../../../pages/profile/profile'



@Component({
    selector: 'menu',
    templateUrl: 'menu.html',
})
export class Menu {

        private navCtrl: NavController;

        constructor(public app: App,
        public menuCtrl: MenuController,
        public ref: ChangeDetectorRef,
        private changeDetector: ChangeDetectorRef) {
            this.menuCtrl.swipeEnable(false);
            this.navCtrl = this.app.getActiveNav();
        }

     public navTo(id: string) {
        switch (id) {
            case 'Profile':
                this.navCtrl.push(ProfilePage);
                break;
        }

        this.menuCtrl.close();

    }


}
