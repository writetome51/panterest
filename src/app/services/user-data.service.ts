import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {GoogleAuthService} from './google-auth.service';
import {Observable} from 'rxjs/Observable';
import {GoogleUser} from '../interfaces/GoogleUser';

@Injectable()
export class UserDataService {

  user: GoogleUser;

  constructor(private _db: AngularFirestore, private _gAuth: GoogleAuthService) {
    this._gAuth.user.subscribe((response) => {
      this.user = response;
    });
  }


  getUser(){
    console.log(this._getUserEmail(this.user.uid));
  }

  private _getUserEmail(uid: string): Observable<any> {
    return this._db.collection('users').doc(uid).valueChanges();
  }


}
