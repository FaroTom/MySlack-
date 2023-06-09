import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MainPageComponent } from '../main-page/main-page.component';
import { CenterContentComponent } from '../center-content/center-content.component';

@Component({
  selector: 'app-leftside',
  templateUrl: './leftside.component.html',
  styleUrls: ['./leftside.component.scss']
})
export class LeftsideComponent {
  channelDropdown = false;
  dmDropdown = false;
  colleagues: any;
  channels: any;
  newChannel = false;

  constructor(private firestore: AngularFirestore, private centerContent: CenterContentComponent, private mainpage: MainPageComponent) {
    this.firestore
      .collection('colleagues')
      .valueChanges()
      .subscribe(colleagues => {
        this.colleagues = colleagues;
      })

      this.firestore
        .collection('channels')
        .valueChanges({idField: 'channelName'})
        .subscribe(channels => {
          this.channels = channels;
        })
  }

  toggleChannelDropdown() {
    if(this.channelDropdown == false) {
      this.channelDropdown = true;
    } else {
      this.channelDropdown = false;
    }
  }

  toggleDmDropdown() {
    if(this.dmDropdown == false) {
      this.dmDropdown = true;
    } else {
      this.dmDropdown = false;
    }
  }

  toggleNewChannel() {
    if(this.newChannel == false) {
      this.newChannel = true;
    } else {
      this.newChannel = false;
    }
  }

  setCurrentChannel(channel: any) {
    this.firestore
      .collection('currentChat')
      .doc('currentChat')
      .update({
        "currentChat": channel
      })
  }
}
