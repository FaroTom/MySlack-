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

  constructor(private firestore: AngularFirestore, private centerContent: CenterContentComponent) {
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

  setCurrentChannel(channel: any) {
    this.centerContent.currentChannel = channel;
    console.log(this.centerContent.currentChannel)
  }
}
