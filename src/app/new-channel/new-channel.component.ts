import { Component, Input } from '@angular/core';
import { LeftsideComponent } from '../leftside/leftside.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MainPageComponent } from '../main-page/main-page.component';

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.scss']
})
export class NewChannelComponent {
@Input() newChannelName: any;
  
  constructor(public leftsideComponent: LeftsideComponent, private firestore: AngularFirestore, public mainpage: MainPageComponent) {

  }

  toggleNewChannel() {
    if(this.leftsideComponent.newChannel == false) {
      this.leftsideComponent.newChannel = true;
    } else {
      this.leftsideComponent.newChannel = false;
    }
  }

  createNewChannel() {
    if(this.newChannelName != undefined) {
      this.firestore
      .collection('channels')
      .doc(this.newChannelName)
      .set({})

      this.firestore
        .collection('channels')
        .doc(this.newChannelName)
        .collection('participants')
        .add({
          name: this.mainpage.currentName
        })
        .then( () => {
          this.toggleNewChannel()
        })
    } else {
      alert('Bitte geben Sie einen Namen für den neuen Channel ein.')
    }
  }
}
