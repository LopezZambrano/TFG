import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Friend } from '../../shared/models/friend'
import 'rxjs/add/operator/map';
import { HttpCustomService } from '../services/http-custom.service' 
import { config } from '../config'

@Injectable()
export class FriendService {

constructor(public http: HttpCustomService){}

addFriend(friendId, userId){
      let url = `${config.baseUrl}/friend/add`;
      let body = {"idUser": userId, "idFriend": friendId};
        return this.http.doPost(url, body)
            .map((res) => {
                return res.json();
            })
}

getMyFriends(id):Observable<Friend>{
      let url = `${config.baseUrl}/friend/${id}`;
        return this.http.doGet(url)
            .map((res) => {
                return res.json()[0];
            })
  }
}
