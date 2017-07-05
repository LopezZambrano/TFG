import { Component, Input, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'page-header',
  templateUrl: 'header.html'
})
export class Header implements OnInit{


  @Input() pageName: string;
  @Input() back: boolean;

  constructor(public navCtrl: NavController,
              private platform: Platform) {

  }

  ngOnInit(){
    console.log(this.back)
  }

  navToBack(){
      this.navCtrl.pop();
  }

  navToHelpPage() {
    //this.navCtrl.push(HelpPage);
  }

  navToHomePage() {
    //this.navCtrl.push(HelpPage);
  }
}