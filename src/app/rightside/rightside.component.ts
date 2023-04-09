import { Component, Input } from '@angular/core';
import { MainPageComponent } from '../main-page/main-page.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CenterContentComponent } from '../center-content/center-content.component';

@Component({
  selector: 'app-rightside',
  templateUrl: './rightside.component.html',
  styleUrls: ['./rightside.component.scss']
})
export class RightsideComponent {
  @Input() newResponse!: string;
  responses: any;
  
  constructor (public mainpage: MainPageComponent, private firestore: AngularFirestore, public centerComponent: CenterContentComponent) {
  }

  unsetOpenedMessage() {
    this.mainpage.openedMessage = undefined;
  }

  sendNewResponse() {
    let date = new Date().toLocaleDateString()
    let times = new Date().toLocaleTimeString().split(':')
    let time = times[0] + ':' + times[1] + 'Uhr'
    if (this.newResponse != undefined) {
      this.firestore
        .collection('channels')
        .doc(this.centerComponent.currentChat[0])
        .collection('messages')
        .doc(this.mainpage.openedMessage.Id)
        .collection('responses')
        .add( {
          name: this.mainpage.currentUser[0],
          message: this.newResponse,
          date: date,
          time: time,
        })
        this.newResponse = '';
    }
  }
}
