import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../../services/auth-service';
import {HelloIonicPage} from '../../../pages/hello-ionic/hello-ionic'
import {RegisterPage} from '../../../pages/login/register/register'
import { AlertController } from 'ionic-angular';

 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  email: string;
  password: string;
  texto: string;
 
  constructor(private nav: NavController, private auth: AuthService, public alertCtrl: AlertController) { }

  public login() {
    if (this.auth.login(this.email,this.password)){
       this.nav.setRoot(HelloIonicPage);      
    } else {
      let alert = this.alertCtrl.create({
        title: "Fallo de autenticación",
        subTitle:  "Por favor introduzca de nuevo el email y contraseña",
        buttons: ['OK']
    });
    alert.present();

    }
  }

  public createAccount(){
    this.nav.setRoot(RegisterPage); 
  }

 

} 