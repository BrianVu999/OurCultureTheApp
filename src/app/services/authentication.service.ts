import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject } from 'rxjs';
import firebase from 'firebase/compat/app';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated: boolean = false;
  errorMsg = new Subject<string>();

  userData: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth, private db: DatabaseService) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  async SignUp(name: string, email: string, password: string) {
    let result = false;
    await this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('You are Successfully signed up!', res);
        result = true;
        this.db.saveUser(res.user.uid, email, password, name)
      })
      .catch((error) => {
        this.errorMsg.next('Your account is already existed!');
        console.log(error.code);
      });
    return result;
  }

  /* Sign in */
  async SignIn(email: string, password: string): Promise<boolean> {
    let result = false;
    await this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("You're in!");
        this.isAuthenticated = true;
        result = true;
        localStorage.setItem('user', JSON.stringify(res.user))
      })
      .catch((error) => {
        if (error.code == 'auth/user-not-found') {
          this.errorMsg.next('Your account is not existed!');
        } else {
          this.errorMsg.next('Your password is wrong!');
        }
      });
    return result;
  }

  /* Sign out */
  SignOut() {
    this.isAuthenticated = false;
    this.angularFireAuth.signOut();
  }
}
