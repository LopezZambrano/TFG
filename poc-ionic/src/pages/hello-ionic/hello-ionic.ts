import { Component } from '@angular/core';
import {User} from '../../object/user'

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  user =  {email: 'pepe@gmail.com',
           password: '1234',
          foto: '1',
          name: 'Pepe'}
}
