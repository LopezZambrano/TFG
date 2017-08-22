import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Poll } from '../../shared/models/poll'
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/catch';
import { PollService } from '../../shared/services/poll-service';
import { AuthService } from '../../shared/services/auth-service'
import { VoteService } from '../../shared/services/vote-service'
import { HomePage } from '../../pages/home/home'

import { Vote } from '../../shared/models/vote'
import { User } from  '../../shared/models/user'



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
    this.type = navParams.get('type');
  }

  controltype = new FormControl();
  controldate = new FormControl();
  controltext = new FormControl();
  pollForm: FormGroup;
  poll: Poll = { title: '' };
  type: string;
  fecha: boolean = false;

  option: Vote[] = [];

  cont: boolean = false;
  error: boolean = false;

  user: User;


  ngOnInit() {
    this.pollForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'ubication': [null, Validators.required],
      'commentary': [null, Validators.required],
      'negativeVote': [false, Validators.required],
      'private': [false, Validators.required],
      'oneVote': [false, Validators.required],
    });

    this.authService.getUser().subscribe(user=> this.user = user);
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
    this.option.push({ "option": this.controltext.value });
    this.controltext.reset();
    this.cont = true;
  }

  mostrarFechas() {
    this.option.push({ "option": new Date(this.controldate.value) });
    this.controldate.reset();
    this.cont = true;
  }


  save() {

    if (this.pollForm.controls['title'].valid) {
      this.poll.commentary = this.pollForm.controls['commentary'].value;
      this.poll.negativeVote = this.pollForm.controls['negativeVote'].value;
      this.poll.oneVote = this.pollForm.controls['oneVote'].value;
      this.poll.private = this.pollForm.controls['private'].value;
      this.poll.title = this.pollForm.controls['title'].value;
      this.poll.ubication = this.pollForm.controls['ubication'].value;
      this.poll.type = this.type;

      if (this.option.length !== 0) {
        this.poll.possibilities = this.option;
      }

     this.pollService.savePoll(this.poll, this.user._id)
      .subscribe(res => {
          this.voteService.saveVote(this.prepareOption(res.possibilities), res._id, res).subscribe(val => {
            let alert = this.alertCtrl.create({
              title: "Guardado",
              subTitle: "Encuesta creada con éxito",
              buttons: ['OK']
            });
            alert.present();
            this.navCtrl.setRoot(HomePage);
          })

        },
        err => {
          console.log('error')
        })

    } else {
      this.error = true;
    }
  }

  ionViewDidEnter() {
    if (this.type == 'fecha') {
      this.fecha = true;
    }
  }

  prepareOption(opt) {
    var i = 0;
    var votes: Vote[] = [];
    for (i; i < opt.length; i++) {
      var o: Vote = {'votes': [this.user.name], 'option': opt[i].option}
      votes.push(o);
    }
    return votes;
  }

}
