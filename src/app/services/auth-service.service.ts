import { Injectable } from '@angular/core';
import { FireUser } from '../shared/services/fire-user'
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router
  ) { }


  localSignIn({ email, password }) {
    try {
      return this.fireAuth.signInWithEmailAndPassword(email, password).then(response => {
        return response['user']
      }).catch(err => err)
    } catch (error) {
      console.log(error)
    }
  }

  googleSignIn() {
    try {
      return this.fireAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider)
        .then(response => {
          return response['user'];
        }).catch(err => err)
    } catch (error) {
      console.log(error)
    }
  }
}
