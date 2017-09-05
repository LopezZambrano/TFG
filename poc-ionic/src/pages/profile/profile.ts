import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth-service'
import { User } from '../../shared/models/user'

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage implements OnInit{

 constructor(private auth: AuthService,
 public formBuilder: FormBuilder){}

 user: User;

 profileForm: FormGroup;

  ngOnInit(){
    this.auth.getUser().subscribe(user=> this.user = user);

     this.profileForm = this.formBuilder.group({
      'user': [this.user.name, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  save(){



  }
}
