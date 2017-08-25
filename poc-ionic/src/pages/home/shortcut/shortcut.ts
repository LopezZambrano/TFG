import { Component, Input, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { ProfilePage } from '../../profile/profile'
import { MyFriendsPage } from '../../my-friends/my-friends'
import { NewPollPage } from '../../newPoll/newPoll'
import { ListPage } from '../../list/list'

@Component({
  selector: 'page-shortcut',
  templateUrl: 'shortcut.html'
})

export class Shortcut implements OnInit {

  @Input() pageName: string;
  @Input() image: string;
  @Input() id: string;


  constructor(public navCtrl: NavController,
            private platform: Platform,
            private alertCtrl: AlertController) { }

  ngOnInit() {

  }

  goTo(page) {
    if (page == 'Perfil') {
      this.navCtrl.push(ProfilePage);
    } else if (page == 'Nueva encuesta'){

      let alert = this.alertCtrl.create();
      alert.setTitle('Seleccione el tipo de encuesta');

      alert.addInput({
        type: 'radio',
        label: 'Texto',
        value: 'texto',
        checked: true
      });

      alert.addInput({
        type: 'radio',
        label: 'Fecha',
        value: 'fecha'
      });

      alert.addButton('Cancel');
      alert.addButton({
      text: 'OK',
      handler: data => {
       this.navCtrl.push(NewPollPage, {
         'type': data
       })
      }
    });
    alert.present();
     

    } else if (page == 'Mis encuestas'){
      this.navCtrl.push(ListPage);
    } else if(page == 'Mis amigos'){
      this.navCtrl.push(MyFriendsPage);
    }
  }

}