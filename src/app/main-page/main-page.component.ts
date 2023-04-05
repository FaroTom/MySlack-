import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  currentUser: any;
  profileMenu = false;

  constructor(private appcomponent: AppComponent, private router: Router, private firestore: AngularFirestore) {
    this.firestore
        .collection('currentUser')
        .valueChanges()
        .subscribe(user => {
          this.currentUser = Object.values(user[0]!)
        })
  }

  toggleProfileMenu() {
    if (this.profileMenu == false) {
      this.profileMenu = true;
    } else {
      this.profileMenu = false;
    }
  }

  logOut() {
    this.router.navigateByUrl('/login');
  }
}
