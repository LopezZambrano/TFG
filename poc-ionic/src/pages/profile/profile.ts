import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../shared/services/common'
import { AuthService } from '../../shared/services/auth-service'
import { User } from '../../shared/models/user'
import { LoginPage } from '../login/login/login'

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage implements OnInit {

  constructor(private auth: AuthService,
    private nav: NavController,
    private common: CommonService,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder) {
    this.errors['user'] = [];
    this.errors['confirm'] = [];
    this.errors['password'] = [];
  }

  user: User;
  errors = [];

  profileForm: FormGroup;

  ngOnInit() {
    this.auth.getUser().subscribe(user => this.user = user);

    this.profileForm = this.formBuilder.group({
      'user': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'confirm': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  error(id, type) {
    if (type === 1) {
      this.errors[id].unshift('Dato requerido');
    } else if (type === 2) {
      this.errors[id].unshift('Contraseña no válida');
    } else if (type === 3) {
      this.errors[id].unshift('Formato no válido');
    } else if (type === 4) {
      this.errors[id].unshift('La contraseña debe contener al menos 6 caracteres');
    } else if (type === 401) {
      this.errors[id].unshift('Ya existe una cuenta con este nombre');
    } else if (type === 400) {
      this.errors[id].unshift('Ya existe una cuenta con este email');
    }
  }

  validator() {
    this.errors['user'] = [];
    this.errors['confirm'] = [];
    this.errors['password'] = [];
    if (!this.profileForm.controls['password'].valid && this.profileForm.controls['password'].value !== null) {
      this.error('password', 4)
    }

  }



  save() {

    this.validator();

    if (this.profileForm.controls['user'].value !== this.user.name) {
      if (this.profileForm.controls['password'].value !== null && this.profileForm.controls['password'].valid) {
        if (this.profileForm.controls['confirm'].valid && this.profileForm.controls['confirm'].value === this.user.password) {
          this.auth.updateUser(this.profileForm.controls['user'].value, this.profileForm.controls['password'].value).subscribe(res => {
            this.showPopup("Guardado", "Cambios guardados correctamente")
            this.auth.getUser().subscribe(user => this.user = user);
          },
            err => {
              if (err.status === 401) {
                this.showPopup("Error", "Ya hay una cuenta registrada con ese nombre");
                this.error('user', err.status);
              }
            })

        } else {
          this.error('confirm', 2)
        }

      } else {
        if (this.profileForm.controls['confirm'].valid && this.profileForm.controls['confirm'].value === this.user.password) {
          this.auth.updateUser(this.profileForm.controls['user'].value, this.user.password).subscribe(res => {
            this.showPopup("Guardado", "Cambios guardados correctamente")
            this.auth.getUser().subscribe(user => this.user = user);
          },
            err => {
              if (err.status === 401) {
                this.showPopup("Error", "Ya hay una cuenta registrada con ese nombre");
                this.error('user', err.status);
              }
            })
        } else {
          this.error('confirm', 2)
        }

      }
    } else {
      if (this.profileForm.controls['password'].value !== null && this.profileForm.controls['password'].valid) {
        if (this.profileForm.controls['confirm'].valid && this.profileForm.controls['confirm'].value === this.user.password) {
          this.auth.updateUser(this.profileForm.controls['user'].value, this.profileForm.controls['password'].value).subscribe(res => {
            this.showPopup("Guardado", "Cambios guardados correctamente")
            this.auth.getUser().subscribe(user => this.user = user);
          },
            err => {
              if (err.status === 401) {
                this.showPopup("Error", "Ya hay una cuenta registrada con ese nombre");
                this.error('user', err.status);
              }
            })
        } else {
          this.error('confirm', 2)
        }
      } else {
        console.log('No ha cambiado nada')
      }
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

  borrar(){
    this.auth.deleteUser().subscribe(res=>{
      this.showPopup('Confirmación', 'Su cuenta ha sido eliminada con éxito');
      this.nav.push(LoginPage);
    })
  }
}
