import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Subscription} from 'rxjs/Subscription';
import {environment} from '../../environments/environment';
import {UserStore} from '../interfaces/UserStore';
import {Observer} from '../interfaces/Observer';
import {SpecificRecipe} from '../interfaces/SpecificRecipe';
import {ApiService} from './api.service';

@Injectable()
export class RecipeDataService {

    subscription: Subscription;
    db: AngularFirestoreCollection<object>;
    recipe: SpecificRecipe;
    store: AngularFirestoreDocument<object>;


    constructor(private firestore: AngularFirestore,
                private _api: ApiService) {

        this.subscription = this._afAuth.subscribe((response) => {
            if (response) {
                this._setupAllLoggedInSettings();
            }
        });
    }


    private _setupAllLoggedInSettings() {

        // this._setupUserDataProperties() requires a callback passed to it in case
        // you need to run more code inside it that requires access to the properties
        // that have just been assigned values.
        this._setupUserDataProperties(() => {
        });
    }


    update(newData: object) {
        this.store.update(newData);
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


    createComment(user) {
        let comment = {user: user.displayName, body: ''};
        return comment;
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
        this.db = this.firestore.collection('recipes');
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


    private _createDefaultRecipeStore() {
        let content = {};
        content['displayName'] = this.user.displayName;
        content['favorites'] = {};
        this.db.doc(this.user.email).set(content);
    }


}
