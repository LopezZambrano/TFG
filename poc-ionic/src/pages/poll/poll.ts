import { Component, OnInit, OnChanges } from '@angular/core';
import {User} from '../../object/user'
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-poll',
  templateUrl: 'poll.html'
})

export class PollPage {

    controltype = new FormControl();
    controldate = new FormControl();
    type : string;
    fecha : boolean = false;
    date : string[]=[];
    cont : boolean = false;

    delete(dat){
      var index = this.date.indexOf(dat);
      if (index > -1) {
        this.date.splice(index, 1);
      }
    }

    mostrarFechas(){
      this.controldate.valueChanges
            .catch((err) => {
                return [];
            })
            .subscribe((date:string) => {
                  this.date.push(date);
                  this.cont = true;
                }
            )}

            
    

    ionViewDidEnter(){
        this.controltype.valueChanges
            .catch((err) => {
                return [];
            })
            .subscribe((type:string) => {
                this.type = type;
                if (this.type == "fecha") {
                  this.fecha = true;
                  this.mostrarFechas();
                } else {
                  this.fecha = false;
              }
            });




    }
          
}
