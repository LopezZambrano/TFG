import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../services/auth-service';
import {HelloIonicPage} from '../../pages/hello-ionic/hello-ionic'
 
 
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
 
  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }
 
  public createAccount() {
    this.nav.push('Registro');
  }
 
  public login() {
    console.log(this.registerCredentials);
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {        
        console.log('dentro');
        this.nav.setRoot(HelloIonicPage);
      } else {
        console.log('fuera');
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }
 
  showError(text) {
   console.log(text);
  }
} 