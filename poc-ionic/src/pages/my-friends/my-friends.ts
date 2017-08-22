import { Component, OnInit } from '@angular/core';


import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../shared/models/user'

import { AuthService } from '../../shared/services/auth-service'




@Component({
    selector: 'page-my-friends',
    templateUrl: 'my-friends.html'
})
export class MyFriendsPage implements OnInit {

    constructor(public authService: AuthService){}



    public query = '';
    public filteredList = [];
    public elementRef;

    users: User[];

    ngOnInit() {
        this.authService.getAllUsers()
        .subscribe(users=>{
            this.users = users;
        },
        err=>{
            console.log(err)
        })
    }


    filter() {
        if (this.query !== "") {
            this.filteredList = this.users.filter(function (el) {
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredList = [];
        }
    }

    select(item) {
        this.query = item;
        this.filteredList = [];
    }

}