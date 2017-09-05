import { Component, OnInit } from '@angular/core';


import { NavParams, App } from 'ionic-angular';

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

  public pollSend = [];


  myFriends: User[] = [];
  myUser: User;
  search: boolean = true;

  allUsers: User[];

  private onComplete: any;
  newPoll: Poll = { title: '' };

  ngOnInit() {

    this.onComplete = this.navParams.data.onComplete;
    this.newPoll = this.navParams.data.newPoll;

    this.authService.getAllUsers()
      .subscribe(users => {
        this.allUsers = users;
        this.friendService.getMyFriends(this.myUser._id).subscribe(friends => {
          if (friends) {
            this.getMyFriendsForId(users, friends.idFriends);
            this.filteredList = this.myFriends;
          } else {
            this.myFriends = null;
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
    this.checkSend();

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

  send(item) {
    this.pollService.saveSendPoll(item._id, this.newPoll._id).subscribe(res => {
      this.query = item.name;
      this.pollSend.push(item);
      this.clean(item);
    })
  }

  deleteSend(userDelete){

    this.pollService.deleteSendPoll(userDelete._id, this.newPoll._id)
      .subscribe(res=>{
        this.pollSend = this.pollSend.filter(user=> user.name !== userDelete.name)
        this.filteredList.push(userDelete);
      })
  }

  checkSend() {
    let i;
    for (i = 0; i < this.pollSend.length; i++) {
      this.myFriends = this.myFriends.filter(user => user._id == this.pollSend[i]._id);
    }
  }

  back() {
    this.query = '';
    this.filteredList = [];
  }

  clean(userSend) {
    this.query = '';
    this.filteredList = this.filteredList.filter(user => user._id !== userSend._id)
  }

  navToNewFriend() {
    this.navCnt.getRootNav().push(MyFriendsPage)

  }

  save() {
      if (this.onComplete) {
        this.onComplete(1);
      }
  }


}