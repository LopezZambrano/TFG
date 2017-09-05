import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from '../models/user'
import { HttpCustomService } from '../services/http-custom.service'
 
 
@Injectable()
export class AuthService {

constructor(public http: HttpCustomService){}

  user: User;
 
  login(email:string, password:string): Observable<any> {
      let url = `http://localhost:3000/user/login`;
      let body = {"email": email, "password":password};
        return this.http.doPost(url, body)
            .map((res) => {
                this.user = res.json();
                return res.json();
            })
  }

  logout(){
      this.user = null;
  }

 register(credentials) {
      let url = `http://localhost:3000/user/register`;
      let body = {"name": credentials.user, "email": credentials.email, "password":credentials.password};
        return this.http.doPost(url, body)
            .map((res) => {
                return res.json();
            })
  }

  getUser(){
    return Observable.of(this.user);
  }

  getAllUsers():Observable<User[]>{
    let url = `http://localhost:3000/user`;
        return this.http.doGet(url)
            .map((res) => {
                return res.json();
            })
  }
}
