import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth-service'
import { User } from '../../shared/models/user'

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage implements OnInit{

 constructor(private auth: AuthService){}

 user: User;

  ngOnInit(){
    this.auth.getUser().subscribe(user=> this.user = user);
  }
}
