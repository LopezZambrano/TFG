import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from '../models/user'
import { HttpCustomService } from '../services/http-custom.service'
import { CommonService } from '../services/common'
import { config } from '../config'
 
@Injectable()
export class AuthService {

constructor(public http: HttpCustomService,
            public common: CommonService){}

  user: User;
 
  login(email:string, password:string): Observable<any> {
      let url = `${config.baseUrl}/user/login`;
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
      let url = `${config.baseUrl}/user/register`;
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
    let url = `${config.baseUrl}/user`;
        return this.http.doGet(url)
            .map((res) => {
                return res.json();
            })
  }


  updateUser(password?,newName?,newPassword?){
     if (newName !== null){
         newName = this.common.capitalize(newName)
     }
     let url = `${config.baseUrl}/user/${this.user._id}`;
      let body = { 'newName': newName, 'newPassword': newPassword, "password": password};
        return this.http.doPut(url, body)
            .map((res) => {
                this.user = res.json();
                return res.json();
            })
  }

  deleteUser(){
      let url = `${config.baseUrl}/user/delete/${this.user._id}`;
        return this.http.doGet(url)
            .map((res) => {
                this.user = res.json();
                return res.json();
            })
  }

}
