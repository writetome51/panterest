import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {GoogleAuthService} from './google-auth.service';
import {Observable} from 'rxjs/Observable';
import {GoogleUser} from '../interfaces/GoogleUser';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class UserDataService {

    user: GoogleUser;
    subscription: Subscription;

    constructor(private _db: AngularFirestore,
                private _afAuth: AngularFireAuth,
                private _gAuth: GoogleAuthService) {

        this.subscription = this._afAuth.authState.subscribe((response) => {
            if (response){ // if true, you're logged in.
                console.log(response);
                this._gAuth.user.subscribe((newResponse) => {
                    this.user = newResponse;
                    console.log(this.user);
                });

            }
        });
        /***
        this.subscription = this._gAuth.user.subscribe((response) => {
            this.user = response;
        });
         ***/
    }


    getUser() {
        console.log(this._getUserEmail(this.user.uid));
    }

    private _getUserEmail(uid: string)
    /*Observable<any>*/ {
        return this.user.email;
        // return this._db.collection('users').doc(uid).valueChanges();
    }


}
