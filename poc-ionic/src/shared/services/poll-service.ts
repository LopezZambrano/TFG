import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpCustomService } from '../services/http-custom.service'
import { Poll } from '../models/poll'


@Injectable()
export class PollService {

    constructor(public http: HttpCustomService) { }

    savePoll(poll: Poll, id): Observable<any> {
        let url = `http://localhost:3000/poll/add`;
        let body = {
            "commentary": poll.commentary, "negativeVote": poll.negativeVote, "oneVote": poll.oneVote,
            "possibilities": poll.possibilities, "private": poll.private, "title": poll.title,
            "ubication": poll.ubication, "type": poll.type, "idUser": id
        };
        return this.http.doPost(url, body)
            .map((res) => {
                return res.json();
            })
    }

    getPolls(id) {
        let url = `http://localhost:3000/poll/${id}`;
        return this.http.doGet(url)
            .map((res) => {
                return res.json();
            })
    }

    saveSendPoll(idUserToSend, idPoll) {
        let url = `http://localhost:3000/pending/add`;
        let body = { "idUser": idUserToSend, "idPolls": idPoll };
        return this.http.doPost(url, body)
            .map((res) => {
                return res.json();
            })
    }

    deleteSendPoll(idUserToSend, idPoll) {
        let url = `http://localhost:3000/pending/delete`;
        let body = { "idUser": idUserToSend, "idPolls": idPoll };
        return this.http.doPost(url, body)
            .map((res) => {
                return res.json();
            })
    }
}