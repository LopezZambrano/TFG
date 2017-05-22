import { Component } from '@angular/core';
import {User} from '../../object/user'

@Component({
  selector: 'page-poll',
  templateUrl: 'poll.html'
})
export class PollPage {

  user =  {email: 'pepe@gmail.com',
           password: '1234',
           foto: '1',
           name: 'Pepe'}
}
