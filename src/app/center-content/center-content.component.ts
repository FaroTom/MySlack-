import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-center-content',
  templateUrl: './center-content.component.html',
  styleUrls: ['./center-content.component.scss']
})
export class CenterContentComponent {
  currentChannel = 'community'
  allMessages: any;
  messagesAsArray: any;
  contributors: any = [];
  messages: any = [];

  constructor(private firestore: AngularFirestore) {
    this.firestore
      .collection('channels')
      .doc(this.currentChannel)
      .collection('messages')
      .valueChanges()
      .subscribe(messages => {
        this.allMessages = messages;
        console.log(this.allMessages)
        this.messagesAsArray = Object.values(this.allMessages)
        for (let i = 0; i < this.messagesAsArray.length; i++) {
          const element = this.messagesAsArray[i]['message'];
          this.messages.push(element)
        }
      })
      }
  
}
