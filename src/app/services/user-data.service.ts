import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {GoogleAuthService} from './google-auth.service';
import {Observable} from 'rxjs/Observable';
import {GoogleUser} from '../interfaces/GoogleUser';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observer} from '../interfaces/Observer';
import {UserStore} from '../interfaces/UserStore';

@Injectable()
export class UserDataService {

    user: GoogleUser;
    userDB: AngularFirestoreCollection<object>;
    subscription: Subscription;
    store: UserStore;


    constructor(private _db: AngularFirestore,
                private _afAuth: AngularFireAuth,
                private _gAuth: GoogleAuthService) {

        this.subscription = this._afAuth.authState.subscribe((response) => {
            if (response){ // if true, you're logged in.
                console.log(response);
                this._set_userDB();
                this._gAuth.user.subscribe((newResponse) => {
                    this.user = newResponse;
                    this._set_store();
                });

            }
        });
    }


    private _set_userDB(){
        this.userDB = this._db.collection('users');
    }


    private _set_store(){
        return this.userDB.doc(this.user.email).valueChanges()
            .subscribe((response: UserStore) => {
                this.store = response;
                console.log(this.store);
            });
    }


}
