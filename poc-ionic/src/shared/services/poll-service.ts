import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpCustomService } from '../services/http-custom.service'
import { Poll } from '../models/poll'
import { config } from '../config'

@Injectable()
export class PollService {

    constructor(public http: HttpCustomService) { }

    savePoll(poll: Poll, id): Observable<any> {
        let url = `${config.baseUrl}/poll/add`;
        let body = {
            "commentary": poll.commentary, "negativeVote": poll.negativeVote, "oneVote": poll.oneVote,
            "possibilities": poll.possibilities, "private": poll.private, "title": poll.title,
            "ubication": poll.ubication, "type": poll.type, "idUser": id, "_id": poll._id
        };
        return this.http.doPost(url, body)
            .map((res) => {
                return res.json();
            })
    }

    getPolls(id) {
        let url = `${config.baseUrl}/poll/${id}`;
        return this.http.doGet(url)
            .map((res) => {
                return res.json();
            })
    }

    getAllPolls() {
        let url = `${config.baseUrl}/poll`;
        return this.http.doGet(url)
            .map((res) => {
                return res.json();
            })
    }

    saveSendPoll(idUserToSend, idPoll) {
        let url = `${config.baseUrl}/pending/add`;
        let body = { "idUser": idUserToSend, "idPolls": idPoll };
        return this.http.doPost(url, body)
            .map((res) => {
                return res.json();
            })
    }

    deleteSendPoll(idUserToSend, idPoll) {
        let url = `${config.baseUrl}/pending/delete`;
        let body = { "idUser": idUserToSend, "idPolls": idPoll };
        return this.http.doPost(url, body)
            .map((res) => {
                return res.json();
            })
    }
}