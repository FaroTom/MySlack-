import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent {
  @Input() email: any;
  @Input() password: any;
  registeredUsers: any;
  userAlert = false;

  constructor(private router: Router, private firestore: AngularFirestore, private appcomponent: AppComponent) {
    this.firestore
      .collection('users')
      .valueChanges()                 /* Gets every document in collection 'users' and defines them as registered users **/
      .subscribe(users => { 
        this.registeredUsers = users
      })
  }

  toSignUp() {
    this.router.navigateByUrl('/signup');
  }

  login() {
    for (let i = 0; i < this.registeredUsers.length; i++) {
      const element = this.registeredUsers[i];
      if (element['email'] == this.email && element['password'] == this.password) {
        this.firestore
          .collection('currentUser')
          .doc('TP2JYunsMv7Ujn29QJIB')
          .update({
            currentUser: element['name']
          })
        this.router.navigateByUrl('/dashboard');
      } else {
        this.userAlert = true;
        setTimeout(() => {
          this.userAlert = false;
        }, 3000)
      }
    }
  }

  guestLogin() {
    this.firestore
      .collection('currentUser')
      .doc('TP2JYunsMv7Ujn29QJIB')
      .update({
        currentUser: 'Guest'
      })
    this.router.navigateByUrl('/dashboard');
  }

}
