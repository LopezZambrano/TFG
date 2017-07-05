import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  polls=[{title:"Cena fin curso", date:new Date},{title:"Comida familiar", date:new Date}]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
