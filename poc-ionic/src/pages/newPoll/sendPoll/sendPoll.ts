import { Component, OnInit } from '@angular/core';


import { NavController, NavParams, App } from 'ionic-angular';

import { MyFriendsPage } from '../../../pages/my-friends/my-friends'

import { User } from '../../../shared/models/user'
import { Poll } from '../../../shared/models/poll'
import { AuthService } from '../../../shared/services/auth-service'
import { PollService } from '../../../shared/services/poll-service'
import { FriendService } from '../../../shared/services/friend-service'



@Component({
  selector: 'page-sendPoll',
  templateUrl: 'sendPoll.html'
})
export class SendPollPage implements OnInit {

  constructor(public authService: AuthService,
    public pollService: PollService,
    public friendService: FriendService,
    public navParams: NavParams, 
    public navCnt: App) { }


  public query = '';
  public filteredList = [];
  public elementRef;

  public pollSend: User[] = [];


  myFriends: User[] = [];
  myUser: User;
  search: boolean = true;

  private onComplete: any;
  newPoll: Poll = { title: '' };

  ngOnInit() {

    this.onComplete = this.navParams.data.onComplete;
    this.newPoll = this.navParams.data.newPoll;


    this.authService.getAllUsers()
      .subscribe(users => {
        this.friendService.getMyFriends(this.myUser._id).subscribe(friends => {
          if (friends){
            this.getMyFriendsForId(users, friends.idFriends);
            this.filteredList = this.myFriends;
          } else {
            this.filteredList = [];
          }

        })
      },
      err => {
        console.log(err)
      })

    this.authService.getUser().subscribe(user => {
      this.myUser = user;
    },
      err => {
        console.log(err)
      })
  }


  getMyFriendsForId(allUsers, idFriends) {
    let i;
    for (i = 0; i < idFriends.length; i++) {
      this.myFriends.push(allUsers.find(user => user._id == idFriends[i]));
    }
  }


  filter() {
    this.search = true;
    if (this.query !== "") {
      this.filteredList = this.myFriends.filter(function (el) {
        return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
      if (this.filteredList.length == 0) {
        this.search = false;
      }
    } else {
      this.filteredList = this.myFriends;

    }
  }

  select(item) {
    this.query = item.name;
    this.pollSend.push(item.name);
    this.pollService.saveSendPoll(item._id, this.newPoll._id).subscribe(res => {
      if (this.onComplete) {
        this.onComplete();
      }
    })
  }

  checkButton(name) {
    return this.pollSend.find(name);
  }

  back() {
    this.query = '';
    this.filteredList = [];
  }

  navToNewFriend(){
    this.navCnt.getRootNav().push(MyFriendsPage)

  }

}