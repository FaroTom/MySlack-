import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent {
  @Input() email: any;
  @Input() password: any;
  registeredUsers: any;
  angForm!: FormGroup;

  constructor(private router: Router, private firestore: AngularFirestore, private fb: FormBuilder) {
    this.firestore
      .collection('users')
      .valueChanges()                 /* Gets every document in collection 'users' and defines them as registered users **/
      .subscribe(users => { 
        this.registeredUsers = users
        console.log(this.registeredUsers)
      })

      this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
       email: ['', Validators.required ],
       password: ['', Validators.required ]
    });
  }

  toSignUp() {
    this.router.navigateByUrl('/signup');
  }

  login() {
    for (let i = 0; i < this.registeredUsers.length; i++) {
      const element = this.registeredUsers[i];
      if (element['email'] == this.email && element['password'] == this.password) {
        console.log('success')
      } else {
        console.log('user not found')
      }
    }
  }

  guestLogin() {
    this.router.navigateByUrl('/dashboard');
  }

}
