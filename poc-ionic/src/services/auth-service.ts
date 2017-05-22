import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from '../object/user'
 
 
@Injectable()
export class AuthService {
  email: string;
  password: string;
  access: boolean;
  registerCredentials = {name: '', email: '', password: '' };
 
  public login(email:string, password:string) {
    
    if (email === null || password === null) {
      return Observable.throw("Please insert credentials");
    } else {
        return this.access = (password === 'pass' && email === 'email');
    }    

  }

 public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
}
