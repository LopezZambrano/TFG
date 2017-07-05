import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AuthService } from '../../../shared/services/auth-service';
import { HomePage } from '../../../pages/home/home'
import { RegisterPage } from '../../../pages/login/register/register'


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage implements OnInit {

  email: string;
  password: string;
  texto: string;

  constructor(private nav: NavController,
    private auth: AuthService,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder) { }

  loginForm: FormGroup;
  error = { 'user': false, 'password': false }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'user': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  verifyLogin() {
    if (!this.loginForm.controls['user'].valid) {
      this.error.user = true
    } 
    if (!this.loginForm.controls['password'].valid) {
      this.error.password = true
    }
  }

  login() {

    if (!this.error.user && !this.error.password) {

      if (this.auth.login(this.email, this.password)) {
        this.nav.setRoot(HomePage);
      } else {
        let alert = this.alertCtrl.create({
          title: "Fallo de autenticación",
          subTitle: "Por favor introduzca de nuevo el email y contraseña",
          buttons: ['OK']
        });
        alert.present();

      }
    }
  }

  register() {
    this.nav.setRoot(RegisterPage);
  }

  createAccount() {
    this.nav.setRoot(RegisterPage);
  }

} 