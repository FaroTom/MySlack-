import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MainPageComponent } from '../main-page/main-page.component';

@Component({
  selector: 'app-center-content',
  templateUrl: './center-content.component.html',
  styleUrls: ['./center-content.component.scss']
})
export class CenterContentComponent {
  currentChat: any;
  messages: any = [];
  chatParticipants: any;
  @Input() newMessage!: string;

  constructor(private firestore: AngularFirestore, private mainpage: MainPageComponent) {
    this.firestore
      .collection('currentChat')
      .doc('currentChat')
      .valueChanges()
      .subscribe(currentChat => {
        this.currentChat = Object.values(currentChat!)
        this.loadMessages()
      })
  }

  loadMessages() {
    this.firestore
      .collection('channels')
      .doc(this.currentChat[0])
      .collection('messages')
      .valueChanges()
      .subscribe(messages => {
        this.messages = Object.values(messages!)
      })
  }

  sendNewMessage() {
    let date = new Date().toLocaleDateString()
    let times = new Date().toLocaleTimeString().split(':')
    let time = times[0] + ':' + times[1] + 'Uhr'
    if (this.newMessage != undefined) {
      this.firestore
        .collection('channels')
        .doc(this.currentChat[0])
        .collection('messages')
        .add( {
          name: this.mainpage.currentUser[0],
          message: this.newMessage,
          date: date,
          time: time,
        })
        this.newMessage = '';
    }
  }

}
