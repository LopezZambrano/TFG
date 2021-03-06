import { Component, OnInit } from '@angular/core';

import { User } from '../../shared/models/user'
import { AuthService } from '../../shared/services/auth-service'
import { FriendService } from '../../shared/services/friend-service'




@Component({
    selector: 'page-my-friends',
    templateUrl: 'my-friends.html'
})
export class MyFriendsPage implements OnInit {

    constructor(public authService: AuthService,
        public friendService: FriendService) {
        this.myFriends = [{ 'name': '', 'email': '', 'password': 'a', '_id': 111 }];
    }


    public query = '';
    public filteredList = [];
    public elementRef;

    myFriends: User[] = [{ 'name': '', 'email': '', 'password': 'a', '_id': 111 }];
    otherUsers: User[] = [];
    myUser: User;
    search: boolean = true;
    empty: boolean = true;

    ngOnInit() {
        this.myFriends = [];
        this.init();
    }

    init() {
        
        this.otherUsers = [];
        this.authService.getAllUsers()
            .subscribe(users => {
                this.authService.getUser().subscribe(
                    user => {
                        this.myUser = user;
                    },
                    err => {
                        console.log(err)
                    })
                users = users.filter(user => user._id !== this.myUser._id)
                this.friendService.getMyFriends(this.myUser._id).subscribe(friends => {
                    if (friends) {
                        this.getMyFriendsForId(users, friends.idFriends);
                        this.getOtherUserForId(users, friends.idFriends);


                    } else {
                        this.otherUsers = users;
                    }
                })

            },
            err => {
                console.log(err)
            })
    }


    getOtherUserForId(allUsers, idFriends) {
        let i;
        for (i = 0; i < idFriends.length; i++) {
            allUsers = allUsers.filter(user => user._id !== idFriends[i])
            this.otherUsers = allUsers;
        }
    }

    getMyFriendsForId(allUsers, idFriends) {
        this.myFriends = [];
        let i;
        
        for (i = 0; i < idFriends.length; i++) {
            let us = allUsers.find(user => user._id == idFriends[i]);
            if (us !== undefined) {
                this.myFriends.push(us.name);
                this.empty = false;
            }

        }
        this.myFriends = this.myFriends.sort();


    }


    filter() {
        this.search = true;
        if (this.query !== "") {
            this.filteredList = this.otherUsers.filter(function (el) {
                console.log(el)
                console.log(this.query)
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
            if (this.filteredList.length == 0) {
                this.search = false;
            }
        } else {
            this.filteredList = [];

        }
    }

    select(item) {
        this.filteredList = [];
        this.query = '';
        this.friendService.addFriend(item._id, this.myUser._id).subscribe(res => {
            this.init();
        })


    }

    back() {
        this.query = '';
        this.filteredList = [];
        this.init();
    }

}