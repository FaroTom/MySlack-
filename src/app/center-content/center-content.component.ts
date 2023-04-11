import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MainPageComponent } from '../main-page/main-page.component';
import { RightsideComponent } from '../rightside/rightside.component';

@Component({
  selector: 'app-center-content',
  templateUrl: './center-content.component.html',
  styleUrls: ['./center-content.component.scss']
})
export class CenterContentComponent {
  currentChat: any;
  messages: any = [];
  channelInfos = false;
  @Input() newMessage!: string;

  constructor(private firestore: AngularFirestore, public mainpage: MainPageComponent) {
    this.firestore
      .collection('currentChat')
      .doc('currentChat')
      .valueChanges()
      .subscribe(currentChat => {
        this.currentChat = Object.values(currentChat!)
        this.loadMessages()
        this.loadParticipants()
      })
  }

  loadMessages() {
    this.firestore
      .collection('channels')
      .doc(this.currentChat[0])
      .collection('messages')
      .valueChanges({idField: 'Id'})
      .subscribe(messages => {
        this.messages = Object.values(messages!)
      })
  }

  loadParticipants() {
    this.firestore
      .collection('channels')
      .doc(this.currentChat[0])
      .collection('participants')
      .valueChanges()
      .subscribe(participants => {
        this.mainpage.participants = participants;
      })
  }

  loadResponses() {
    this.firestore
      .collection('channels')
      .doc(this.currentChat[0])
      .collection('messages')
      .doc(this.mainpage.openedMessage.Id)
      .collection('responses')
      .valueChanges()
      .subscribe(responses => {
        this.mainpage.responses = responses;
      })
  }

  sendNewMessage() {
    let date = new Date().toLocaleDateString()
    let times = new Date().toLocaleTimeString().split(':')
    let time = times[0] + ':' + times[1] + 'Uhr'
    console.log(this.mainpage.currentUser[0])
    if (this.newMessage != undefined) {
      this.firestore
        .collection('channels')
        .doc(this.currentChat[0])
        .collection('messages')
        .add( {
          name: this.mainpage.currentUser[0].currentName,
          message: this.newMessage,
          date: date,
          time: time,
        })
        this.newMessage = '';
    }
  }

  openMessage(messageId: any) {
    this.firestore
      .collection('channels')
      .doc(this.currentChat[0])
      .collection('messages')
      .doc(messageId)
      .valueChanges({idField: 'Id'})
      .subscribe(message => {
        this.mainpage.openedMessage = message;
        this.loadResponses()
      })
  }

  toggleParticipants() {
    if(this.mainpage.showParticipants == false) {
      this.mainpage.showParticipants = true
    } else {
      this.mainpage.showParticipants = false;
    }
  }

  toggleChannelInfos() {
    if(this.channelInfos == false) {
      this.channelInfos = true
    } else {
      this.channelInfos = false;
    }
  }

}
