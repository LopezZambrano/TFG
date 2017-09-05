import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../../shared/services/auth-service';
import { LoginPage } from '../../login/login/login'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CommonService } from '../../../shared/services/common'

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  createSuccess = false;
  registerCredentials: FormGroup;
  errors = [];

  constructor(private nav: NavController,
      private auth: AuthService,
      private alertCtrl: AlertController,
      private common: CommonService,
      public formBuilder: FormBuilder) {
          this.errors['user'] = [];
          this.errors['email'] = [];
          this.errors['password'] = [];
          this.errors['repeat'] = [];
  }


  ngOnInit() {
    this.registerCredentials = this.formBuilder.group({
      'user': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'repeat': [null, Validators.required],
    });
  }

  //Coge los datos del formulario
  getData() {
    return {
      user: this.registerCredentials.controls['user'].value,
      email: this.registerCredentials.controls['email'].value,
      password: this.registerCredentials.controls['password'].value,
      repeat: this.registerCredentials.controls['repeat'].value,
    }
  }


  //1 Requerido, 2 Coinciden, 3 Formato válido
  error(id, type) {
    if (type === 1) {
      this.errors[id].unshift('Dato requerido');
    } else if (type === 2) {
      this.errors[id].unshift('No coinciden');
    } else if (type === 3) {
      this.errors[id].unshift('Formato no válido');
    } else if (type === 4) {
      this.errors[id].unshift('La contraseña debe contener al menos 6 caracteres');
    } else if (type === 401){
      this.errors[id].unshift('Ya existe una cuenta con este nombre');
    } else if (type === 400){
      this.errors[id].unshift('Ya existe una cuenta con este email');
    }
  }

  initializeErrors() {
    this.errors['user'] = [];
    this.errors['email'] = [];
    this.errors['password'] = [];
    this.errors['repeat'] = [];
  }

  validator(datas) {

    this.initializeErrors();
    if (!this.registerCredentials.controls['email'].valid) {
      this.error('email', 1)
    }
    if (!(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(datas.email))) {
      this.error('email', 3)
    }
    if (!this.registerCredentials.controls['user'].valid) {
      this.error('user', 1)
    }
    if (!this.registerCredentials.controls['password'].valid) {
      this.error('password', 1)
    }
    if (!this.registerCredentials.controls['repeat'].valid) {
      this.error('repeat', 1)
    }
    if (datas.password !== datas.repeat) {
      this.error('repeat', 2)
    }
    if (datas.password.length < 6){
      this.error('password', 4)
    }
  }


  register() {

    var datas = this.getData();

    this.validator(datas);

    if (this.errors['user'].length === 0 && this.errors['email'].length === 0 &&
      this.errors['password'].length === 0 && this.errors['repeat'].length === 0) {

      datas.user = this.common.capitalize(datas.user);

      this.auth.register(datas).subscribe(success => {
          this.showPopup("Enviado", "Cuenta creada con éxito")
          this.createSuccess = true;
          this.nav.push(LoginPage);
      },
        error => {
          if(error.status === 400){
            this.showPopup("Error", "Ya hay una cuenta registrada con este email");
            this.error('email', error.status);
          } else if (error.status === 401) {
            this.showPopup("Error", "Ya hay una cuenta registrada con ese nombre");
            this.error('user', error.status);
          } else {
            this.showPopup("Error", "Se ha producido un error al registrar su cuenta, intentelo de nuevo");
          }
        });
    }
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK'
        
          }
        
      ]
    });
    alert.present();
  }
}