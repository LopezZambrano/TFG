import { Component, OnInit, OnChanges } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController, Platform } from 'ionic-angular';

import {User} from '../../object/user'
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-poll',
  templateUrl: 'poll.html'
})

export class PollPage {

   constructor(public navCtrl: NavController,
              private navParams: NavParams){
                 this.type = navParams.get('type');
              }

    controltype = new FormControl();
    controldate = new FormControl();
    controltext = new FormControl();
    type : string;
    fecha : boolean = false;
    date : string[]=[];
    text: string[] =[];
    cont : boolean = false;

  deleteDat(dat){
      var index = this.date.indexOf(dat);
      if (index > -1) {
        this.date.splice(index, 1);
      }
    }

    deleteText(text){
      var index = this.text.indexOf(text);
      if (index > -1) {
        this.text.splice(index, 1);
      }
    }

    mostrarTextos(){

      this.text.push(this.controltext.value);
      this.controltext.reset();
      this.cont=true;
    
      }

    

    mostrarFechas(){
     
        this.date.push(this.controldate.value);
        this.cont = true;

      
      }

            
    ionViewDidEnter(){

      console.log(this.type)
      if (this.type == 'fecha'){
        this.fecha = true;
      }


    }
          
}
