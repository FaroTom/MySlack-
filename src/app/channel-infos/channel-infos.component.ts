import { Component } from '@angular/core';
import { CenterContentComponent } from '../center-content/center-content.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-channel-infos',
  templateUrl: './channel-infos.component.html',
  styleUrls: ['./channel-infos.component.scss']
})
export class ChannelInfosComponent {
  channelDescription: any;

  constructor(public centerComponent: CenterContentComponent, private firestore: AngularFirestore) {
    this.firestore
      .collection('channels')
      .doc(this.centerComponent.currentChat[0])
      .valueChanges()
      .subscribe(currentChannelDescription => {
        this.channelDescription = Object.values(currentChannelDescription!)

      })
  }
}
