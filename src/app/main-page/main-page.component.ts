import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  currentUser: any;
  profileMenu = false;

  constructor(private appcomponent: AppComponent, private router: Router) {
    this.currentUser = appcomponent.currentUser;
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
