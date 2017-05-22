import { Component } from '@angular/core';
import {User} from '../../object/user'

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user =  {email: 'pepe@gmail.com',
           password: '1234',
           foto: '1',
           name: 'Pepe'}
}
