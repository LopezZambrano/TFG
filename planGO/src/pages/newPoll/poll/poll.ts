import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/catch';

import { PollService } from '../../../shared/services/poll-service';
import { AuthService } from '../../../shared/services/auth-service'
import { VoteService } from '../../../shared/services/vote-service'

import { Vote } from '../../../shared/models/vote'
import { User } from '../../../shared/models/user'
import { Poll } from '../../../shared/models/poll'



@Component({
  selector: 'page-poll',
  templateUrl: 'poll.html'
})

export class PollPage implements OnInit {

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private pollService: PollService,
    private voteService: VoteService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder) {
  }

  private maxDate: Date;
  private minDateReturn: Date;
  private today: Date;
  private todayS: string;

  controltext = new FormControl();
  controltype = new FormControl();
  controldate = new FormControl();
  controlHour = new FormControl();

  showSelectHour: boolean = false;

  private onComplete: any;
  pollForm: FormGroup;
  newPoll: Poll = { title: '' };
  type: string;
  fecha: boolean = false;

  option: Vote[] = [];

  cont: boolean = false;
  errorTitle: boolean = false;
  errorOptions: boolean = false;

  user: User;

  ngOnInit() {

    this.onComplete = this.navParams.data.onComplete;
    this.newPoll = this.navParams.data.newPoll;
    this.type = this.newPoll.type;

    this.pollForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'ubication': [null, Validators.required],
      'commentary': [null, Validators.required],
      'negativeVote': [false, Validators.required],
      'private': [false, Validators.required],
      'oneVote': [false, Validators.required],
    });

    this.authService.getUser().subscribe(user => this.user = user);

    this.today = new Date();
    this.todayS = this.today.toISOString()
    // We put as departureDate, to today
    this.minDateReturn = new Date(this.today.getFullYear(), this.today.getMonth()+1, this.today.getDate());
    // We set the max date in 5 years.
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.today.getFullYear() + 1);
  }

  deleteDat(dat) {
    var index = this.option.indexOf(dat);
    if (index > -1) {
      this.option.splice(index, 1);
    }
  }

  deleteText(text) {
    var index = this.option.indexOf(text);
    if (index > -1) {
      this.option.splice(index, 1);
    }
  }

  mostrarTextos() {
    if (this.controltext.value != null) {
      if (this.checkOption(this.controltext.value).length === 0) {
        this.option.push({ "option": this.controltext.value });
      }

    }
    this.controltext.reset();
    this.cont = true;
    this.errorOptions = false;
  }

  mostrarFechas() {
    let hour = this.controlHour.value;
    let date = (new Date(this.controldate.value))
    if (hour) {
      this.insertHour(date, hour);
    } else {
      if (this.checkOption(date).length === 0) {
        this.option.push(this.createOption(date, ['']));
      }
    }

    this.controlHour.reset();
    this.cont = true;
    console.log(this.option)
    this.errorOptions = false;
  }


  save() {
    this.errorOptions = false;
    this.errorTitle = false;

    if (this.option.length > 0) {
      if (this.pollForm.controls['title'].valid) {
        this.newPoll.commentary = this.pollForm.controls['commentary'].value;
        this.newPoll.oneVote = this.pollForm.controls['oneVote'].value;
        this.newPoll.title = this.pollForm.controls['title'].value;
        this.newPoll.ubication = this.pollForm.controls['ubication'].value;
        this.newPoll.type = this.type;

        if (this.type !== 'texto') {
          let prepareOptionArray = this.prepareOptionsDate()
          this.newPoll.possibilities = prepareOptionArray[0]

          this.pollService.savePoll(this.newPoll, this.user._id)
            .subscribe(res => {
              this.voteService.saveVote(prepareOptionArray[1], res._id).subscribe(val => {
                this.newPoll._id = res._id;
                if (this.onComplete) {
                  this.onComplete(1);
                }
              })
            },
            err => {
              console.log(err)
            })

        } else {
          this.newPoll.possibilities = this.option;

          this.pollService.savePoll(this.newPoll, this.user._id)
            .subscribe(res => {
              this.voteService.saveVote(this.prepareOption(res.possibilities), res._id).subscribe(val => {
                this.newPoll._id = res._id;
                if (this.onComplete) {
                  this.onComplete(1);
                }
              })
            },
            err => {
              console.log(err)
            })
        }

      } else {
        this.errorTitle = true;
      }
    } else {
      this.errorOptions = true;
      if (!this.pollForm.controls['title'].valid) {
        this.errorTitle = true;
      }
    }


  }

  ionViewDidEnter() {
    if (this.type == 'fecha') {
      this.fecha = true;
    }
  }

  prepareOption(opt): Vote[] {
    var i = 0;
    var votes: Vote[] = [];

    for (i; i < opt.length; i++) {
      var o: Vote = { 'votes': [this.user.name], 'option': opt[i].option }
      votes.push(o);
    }
    return votes;
  }

  prepareOptionsDate() {
    let optionToSend: Vote[] = []
    let n;
    let i = 0;
    for (i; i < this.option.length; i++) {
      //Tiene hora
      if (this.option[i].option.hour[0] !== '') {
        //Recorro las horas he inserto
        for (n = 0; n < this.option[i].option.hour.length; n++) {
          optionToSend.push(this.createOption(this.option[i].option.date, this.option[i].option.hour[n]))
        }
        //No tiene horas
      } else {
        optionToSend.push(this.createOption(this.option[i].option.date, ''))
      }
    }

    return [optionToSend, this.prepareOption(optionToSend)]
  }

  showHour() {
    this.showSelectHour = !this.showSelectHour;
    this.controlHour.reset();
    return this.showSelectHour
  }

  insertHour(date, hour) {
    let index = this.option.findIndex(obj => obj.option.date.getTime() === date.getTime());
    // Existe este dia
    if (index !== -1) {
      //No existe hora
      if (this.option[index].option.hour.indexOf(hour) === -1) {
        if (this.option[index].option.hour[0] == '') {
          this.option[index].option.hour[0] = hour;
        } else {
          this.option[index].option.hour.push(hour);
        }
      }
      //No existe dia
    } else {
      if (this.checkOption(date).length === 0) {
        if(!hour){
          hour = ''
        }
        this.option.push(this.createOption(date, [hour]));
      }
    }
  }

  createOption(date, hour) {
    return {
      "option": {
        "date": date,
        "hour": hour
      }
    }
  }


  createArrayVote(n) {
    let i;
    let array = [];
    for (i = 0; i < n; i++) {
      array.push([this.user.name])
    }
    return array
  }


  checkOption(option) {
    if (this.fecha) {
      return (this.option.filter(obj => obj.option.date.getTime() === option.getTime()))
    } else {
      return (this.option.filter(obj => obj.option === option))
    }
  }


}
