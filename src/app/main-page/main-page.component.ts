import { Component, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CenterContentComponent } from '../center-content/center-content.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  @Input() addParticipant: any;

  currentUser: any;
  currentName!: string;
  currentEmail!: string;
  changedMail!: string;
  menu = false;
  profile = false;
  changeMail = false;
  changedMailAlert = false;
  openedMessage: any;
  responses: any;
  participants: any;
  showParticipants = false;
  addParticipants = false;

  constructor(private appcomponent: AppComponent, private router: Router, private firestore: AngularFirestore) {
    this.firestore
        .collection('currentUser')
        .valueChanges()
        .subscribe(user => {
          this.currentUser = Object.values(user!)
          this.currentName = this.currentUser[0]['currentName']
          this.currentEmail = this.currentUser[0]['currentEmail']
        })
  }

  toggleMenu() {
    if (this.menu == false) {
      this.menu = true;
    } else {
      this.menu = false;
    }
  }

  toggleProfile() {
    this.menu = false;
    if(this.profile == false) {
      this.profile = true;
    } else {
      this.profile = false;
    }
  }

  toggleChangeProfile() {
    if(this.changeMail == false) {
      this.changeMail = true;
    } else {
      this.changeMail = false;
    }
  }

  toggleParticipants() {
    if(this.showParticipants == false) {
      this.showParticipants = true
    } else {
      this.showParticipants = false;
    }
  }

  toggleAddParticipants() {
    if(this.addParticipants == false) {
      this.addParticipants = true
    } else {
      this.addParticipants = false;
    }
  }

  submitChangedMail() {
    this.firestore
      .collection('currentUser')
      .doc('TP2JYunsMv7Ujn29QJIB')
      .update({
        currentEmail: this.changedMail
      })
      this.changedMailAlert = true;
      this.changeMail = false;
      setTimeout(() => {
        this.changedMailAlert = false;
      }, 3500)
  }

  logOut() {
    this.router.navigateByUrl('/login');
  }
}
