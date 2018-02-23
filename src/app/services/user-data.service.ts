import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {GoogleAuthService} from './google-auth.service';
import {Observable} from 'rxjs/Observable';
import {GoogleUser} from '../interfaces/GoogleUser';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observer} from '../interfaces/Observer';
import {UserStore} from '../interfaces/UserStore';
import {Favorite} from '../interfaces/Favorite';

@Injectable()
export class UserDataService {

    user: GoogleUser;
    db: AngularFirestoreCollection<object>;
    subscription: Subscription;
    store: AngularFirestoreDocument<object>;
    private _storeIsEmpty: object | null;


    constructor(private firestore: AngularFirestore,
                private _afAuth: AngularFireAuth,
                private _gAuth: GoogleAuthService) {

        this.subscription = this._afAuth.authState.subscribe((response) => {
            if (response){ // if true, you're logged in.
               this._setupUserData();
            }
        });
    }


    update(newData: object){
        this.store.update(newData);
    }


    private _setupUserData(){
        this._set_db();
        this._gAuth.user.subscribe((response) => {
            this.user = response;
            this._set_store();
        });
    }


    private _set_db(){
        this.db = this.firestore.collection('users');
    }


    private _set_store(){
        // The document object is named after user's email:
        this.store = this.db.doc(this.user.email);

        this.store.valueChanges().subscribe((response) => {
            if ( ! response){ // Then store doesn't exist...
                this._createDefaultUserStore();
            }
        });
    }


    private _createDefaultUserStore(){
        let content = {};
        content['displayName'] = this.user.displayName;
        content['favorites'] = {};
        this.db.doc(this.user.email).set(content);
    }



}
