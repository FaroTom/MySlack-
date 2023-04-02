import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoginScreenComponent } from '../login-screen/login-screen.component';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup-screen.component.html',
  styleUrls: ['./signup-screen.component.scss']
})
export class SignupScreenComponent {
  @Input() email: any;
  @Input() password: any;
  @Input() fullName: any;
  loadingAnimation = false;
  userCreated = false;

  constructor(private router: Router, private firestore: AngularFirestore) {

  }

  toLogin() {
    this.router.navigateByUrl('/login');
  }

  signUp() {
    this.loadingAnimation = true;
    const user = { email: this.email, password: this.password, name: this.fullName }
    this.firestore
      .collection('users')
      .add(user)
      .then(() => {
        this.loadingAnimation = false;
        this.email = '';
        this.password = '';
        this.fullName = '';
        this.userCreated = true;
        setTimeout(() => {
          this.userCreated = false;
        }, 4000);
      })
  }
}
