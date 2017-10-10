import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform, MenuController, Nav } from 'ionic-angular';

import { HomePage } from '../../../pages/home/home'
import { HelpPage } from '../../../pages/help/help'

import { AuthService } from '../../services/auth-service'

@Component({
  selector: 'page-header',
  templateUrl: 'header.html'
})
export class Header implements OnInit {


  @Input() pageName: string;
  @Input() back: boolean;
  @Input() login: boolean;

  @ViewChild(Nav) nav: Nav;


  constructor(public navCtrl: NavController,
    public authService: AuthService,
    public menu: MenuController,
    private platform: Platform) {
   
  }


  ngOnInit() {
  }

  navToBack() {
    this.navCtrl.pop();
  }

  navToHelpPage() {
    this.navCtrl.push(HelpPage);
  }

  navToHome() {
    this.authService.getUser().subscribe(user=>{
      if (user){
        this.navCtrl.push(HomePage);
      }
    })

  }



  openCloseMenu() {

    this.menu.open();
  }
}