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
import {SpecificRecipe} from '../interfaces/SpecificRecipe';
import {ApiService} from './api.service';

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
                private googleAuth: GoogleAuthService,
                private _api: ApiService) {

        this.subscription = this._afAuth.authState.subscribe((response) => {
            if (response) { // if true, you're logged in.
                this._setupAllLoggedInSettings();
            }
            else {
                this._unsetLoggedInLocalState();
            }
        });
    }


    private _setupAllLoggedInSettings() {

        // this._setupUserDataProperties() requires a callback passed to it in case
        // you need to run more code inside it that requires access to the properties
        // that have just been assigned values.
        this._setupUserDataProperties(() => {
        });
        this._setLoggedInLocalState();
    }


    getDisplayName(){
        return this.user.displayName;
    }


    update(newData: object) {
        this.store.update(newData);
    }


    login() {
        this.googleAuth.googleLogin();
        this._setupAllLoggedInSettings();
    }

    logout() {
        this.googleAuth.signOut();
        this.subscription.unsubscribe();
        this._unsetLoggedInLocalState();
    }


    getFavorites(observer: Observer) {

        // this._setupUserDataProperties() needs to be called again because,
        // due to its setting of variables asynchronously, when this class'
        // methods are run later, those variables are suddenly undefined.

        return this._setupUserDataProperties(() => {
            if (this.store) {
                this.store.valueChanges().subscribe((userStore: UserStore) => {
                    observer(userStore.favorites);
                });
            }
        });
    }


    private _setLoggedInLocalState() {
        localStorage.setItem(this._localLoggedInKey, 'true');
    }


    private _unsetLoggedInLocalState() {
        localStorage.removeItem(this._localLoggedInKey);
    }


    isLoggedInLocalState() {
        return (localStorage.getItem(this._localLoggedInKey));
    }


    createFavorite(recipe: SpecificRecipe) {
        let favorite = {name: '', content: {}};
        favorite.name = this._api.getRecipeID(recipe);
        favorite.content = recipe;
        return favorite;
    }


    private _setupUserDataProperties(observer) {
        this._set_db();
        return this.googleAuth.user.subscribe((response) => {
            this.user = response;
            this._set_store();
            observer();
        });
    }


    private _set_db() {
        this.db = this.firestore.collection('users');
    }


    private _set_store() {
        if (this.user) {
            // The document object is named after user's email:
            this.store = this.db.doc(this.user.email);

            this.store.valueChanges().subscribe((response) => {
                if (!response) { // Then store doesn't exist...
                    this._createDefaultUserStore();
                }
            });
        }
    }


    private _createDefaultUserStore() {
        let content = {};
        content['displayName'] = this.user.displayName;
        content['favorites'] = {};
        this.db.doc(this.user.email).set(content);
    }


}
