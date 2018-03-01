import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {GoogleAuthService} from './google-auth.service';
import {Observable} from 'rxjs/Observable';
import {GoogleUser} from '../interfaces/GoogleUser';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireAuth} from 'angularfire2/auth';
import {environment} from '../../environments/environment';
import {UserStore} from '../interfaces/UserStore';
import {Observer} from '../interfaces/Observer';

@Injectable()
export class UserDataService {

    subscription: Subscription;
    user: GoogleUser;
    db: AngularFirestoreCollection<object>;
    store: AngularFirestoreDocument<object>;
    private _localStorageKeyPrefix = 'panterest_' + environment.firebase.apiKey;
    private _localLoggedInKey = this._localStorageKeyPrefix + '_loggedIn';


    constructor(private firestore: AngularFirestore,
                private _afAuth: AngularFireAuth,
                private googleAuth: GoogleAuthService) {

        this.subscription = this._afAuth.authState.subscribe((response) => {
            if (response) { // if true, you're logged in.

                // this._setupUserData() requires a callback passed to it in case
                // you need to run more code inside it that requires access to the properties
                // that have just been assigned values.
                this._setupUserData(() => {
                });
                this.setLoggedInLocalState();
            }
            else {
                this.unsetLoggedInLocalState();
            }
        });
    }


    update(newData: object) {
        this.store.update(newData);
    }


    login() {
        this.googleAuth.googleLogin();
    }

    logout() {
        this.googleAuth.signOut();
    }


    getFavorites(observer: Observer) {

        // this._setupUserData() needs to be called again because, due to its setting of variables
        // asynchronously, when this class' methods are run later, those variables are suddenly undefined.
        this._setupUserData(() => {
            this.store.valueChanges().subscribe((userStore: UserStore) => {
                observer(userStore.favorites);
            });
        });
    }


    setLoggedInLocalState() {
        localStorage.setItem(this._localLoggedInKey, 'true');
    }

    unsetLoggedInLocalState() {
        localStorage.removeItem(this._localLoggedInKey);
    }


    isLoggedInLocalState() {
        return (localStorage.getItem(this._localLoggedInKey));
    }


    private _setupUserData(observer) {
        this._set_db();
        this.googleAuth.user.subscribe((response) => {
            this.user = response;
            this._set_store();
            observer();
        });
    }


    private _set_db() {
        this.db = this.firestore.collection('users');
    }


    private _set_store() {
        // The document object is named after user's email:
        this.store = this.db.doc(this.user.email);

        this.store.valueChanges().subscribe((response) => {
            if (!response) { // Then store doesn't exist...
                this._createDefaultUserStore();
            }
        });
    }


    private _createDefaultUserStore() {
        let content = {};
        content['displayName'] = this.user.displayName;
        content['favorites'] = {};
        this.db.doc(this.user.email).set(content);
    }


}
