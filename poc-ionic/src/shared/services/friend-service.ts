import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpCustomService } from '../services/http-custom.service' 
 
@Injectable()
export class FriendService {

constructor(public http: HttpCustomService){}

addFriend(friendId, userId){
      let url = `http://localhost:3000/friend/add`;
      let body = {"idUser": userId, "idFriend": friendId};
        return this.http.doPost(url, body)
            .map((res) => {
                return res.json();
            })
}
 
/*  savePoll(poll:Poll, id): Observable<any> {
      let url = `http://localhost:3000/poll/add`;
      let body = {"commentary": poll.commentary, "negativeVote":poll.negativeVote, "oneVote": poll.oneVote,
                  "possibilities": poll.possibilities, "private":poll.private, "title": poll.title,
                  "ubication": poll.ubication, "type": poll.type, "idUser": id};
        return this.http.doPost(url, body)
            .map((res) => {
                return res.json();
            })
  }

  getPolls(id){
      let url = `http://localhost:3000/poll/${id}`;
        return this.http.doGet(url)
            .map((res) => {
                return res.json();
            })
  }*/
}