import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpCustomService } from '../services/http-custom.service'
import { AuthService } from '../services/auth-service'



@Injectable()
export class VoteService {

    constructor(public http: HttpCustomService,
        public authService: AuthService) { }

    saveVote(options, id): Observable<any> {
            let url = `http://localhost:3000/vote/add`;
            let body = { "options": options, "idPoll": id };
            return this.http.doPost(url, body)
                .map((res) => {
                    return res.json();
                }) 
    }

    saveSendVote(idUser, idPoll) {
        let url = `http://localhost:3000/send/add`;
        let body = { "idUser": idUser, "idPolls": idPoll };
        return this.http.doPost(url, body)
            .map((res) => {
                return res.json();
            })
    }

 

    getVote(id) {
        let url = `http://localhost:3000/vote/${id}`;
        return this.http.doGet(url)
            .map((res) => {
                return res.json()[0];
            })
    }

    getPendingVote(id){
        let url = `http://localhost:3000/pending/${id}`;
        return this.http.doGet(url)
            .map((res) => {
                return res.json()[0].idPolls;
            })
    }

    getSendVote(id){
        let url = `http://localhost:3000/send/${id}`;
        return this.http.doGet(url)
            .map((res) => {
                return res.json()[0].idPolls;
            })
    }

   


    /*    prepareVote(poll: Poll, vote:string[]):Vote[] {
            this.get
            var i = 0;
            for (i; i < vote.length; i++) {
                var index = poll.possibilities.findIndex(v => v.option === vote[i])
                poll.possibilities[index].votes.push('hol')
            }
            return poll.possibilities
        }*/
}