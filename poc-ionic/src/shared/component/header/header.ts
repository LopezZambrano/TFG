import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform, MenuController, Nav } from 'ionic-angular';

import { ProfilePage } from '../../../pages/profile/profile'
import { PollPage } from '../../../pages/poll/poll'

@Component({
  selector: 'page-header',
  templateUrl: 'header.html'
})
export class Header implements OnInit {


  @Input() pageName: string;
  @Input() back: boolean;
  @Input() login: boolean;

  @ViewChild(Nav) nav: Nav;
  pages: Array<{ title: string, component: any }>;

  constructor(public navCtrl: NavController,
    public menu: MenuController,
    private platform: Platform) {
    this.pages = [
      { title: 'Mi perfil', component: ProfilePage },
      { title: 'Mis eventos', component: PollPage }
    ];
  }


  ngOnInit() {
    console.log(this.back)
  }

  navToBack() {
    this.navCtrl.pop();
  }

  navToHelpPage() {
    //this.navCtrl.push(HelpPage);
  }

  navToHomePage() {
    //this.navCtrl.push(HelpPage);
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}