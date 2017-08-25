import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpCustomService } from '../services/http-custom.service'
import { AuthService } from '../services/auth-service'


@Injectable()
export class VoteService {

    constructor(public http: HttpCustomService,
        public authService: AuthService) { }

    saveVote(options, id, poll): Observable<any> {
            let url = `http://localhost:3000/vote/add`;
            let body = { "options": options, "idPoll": id };
            return this.http.doPost(url, body)
                .map((res) => {
                    return res.json();
                }) 
    }
 

    getVote(id) {
        let url = `http://localhost:3000/vote/${id}`;
        return this.http.doGet(url)
            .map((res) => {
                return res.json();
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