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
import {FirestoreDataService} from './firestore-data.service';

@Injectable()
export class UserDataService extends FirestoreDataService {

    user: GoogleUser;
    userSubscription: Subscription;
    store: AngularFirestoreDocument<object>;
    private _localStorageKeyPrefix = 'panterest_' + environment.firebase.apiKey;
    private _localLoggedInKey = this._localStorageKeyPrefix + '_loggedIn';


    constructor(firestore: AngularFirestore,
                private _afAuth: AngularFireAuth,
                private googleAuth: GoogleAuthService,
                private _api: ApiService) {

        super(firestore);

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

        // this._set_user() requires a callback passed to it in case
        // you need to run more code inside it that requires access to the properties
        // that have just been assigned values.
        this.userSubscription  = this._set_user(() => {
            this.setup();
        });
        this._setLoggedInLocalState();
    }


    setup(){
        super.setup('users', this.user.email, this._createDefaultUser());
    }


    getDisplayName(){
        return this.user.displayName;
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
        return this.getProperty('favorites', (favorites) => {
            observer(favorites);
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


    private _set_user(observer) {
        return this.googleAuth.user.subscribe((response) => {
            this.user = response;
            observer();
        });
    }


    private _createDefaultUser() {
        let content = {};
        content['displayName'] = this.user.displayName;
        content['favorites'] = {};
        return content;
    }


}
