import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { App } from 'ionic-angular';
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

  constructor(private nav: App,
    private auth: AuthService,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder) { }

  loginForm: FormGroup;
  error = { 'user': false, 'password': false }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'user': ['s@s.es', Validators.required],
      'password': [12345678, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  verifyLogin() {
    this.error.user = false;
    this.error.password = false;
    if (!this.loginForm.controls['user'].valid) {
      this.error.user = true
    } 
    if (!this.loginForm.controls['password'].valid) {
      this.error.password = true
    }
    if (!(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.loginForm.controls['user'].value))) {
        this.error.user = true
    }
  }

  login() {

    this.verifyLogin();

    if (!this.error.user && !this.error.password) {

      this.auth.login(this.loginForm.controls['user'].value, this.loginForm.controls['password'].value)
        .subscribe(res=>{
          console.log(res)
          this.nav.getRootNav().push(HomePage);
        },
        err=>{
          let alert = this.alertCtrl.create({
          title: "Fallo de autenticación",
          subTitle: "Por favor introduzca de nuevo el email y contraseña",
          buttons: ['OK']
        });
        alert.present();
      })
    }
  }

  register() {
    this.nav.getRootNav().push(RegisterPage);
  }



} 