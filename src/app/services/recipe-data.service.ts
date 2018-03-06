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
    recipeID: string;
    store: AngularFirestoreDocument<object>;


    constructor(private firestore: AngularFirestore,
                private _api: ApiService) {
    }


    setup(recipeID){
        this.recipeID = recipeID;
        this._set_db();
        this._set_store();
    }


    update(newData: object) {
        this.store.update(newData);
    }


    addComment(text, userDisplayName){
        let comment = this._createComment(text, userDisplayName);
        this.update(comment);
    }


    private _set_db() {
        this.db = this.firestore.collection('recipes');
    }


    private _set_store() {
        if (this.recipeID) {
            // The document object is named after recipe's id:
            this.store = this.db.doc(this.recipeID);

            this.store.valueChanges().subscribe((store) => {
                if (!store) { // Then store doesn't exist...
                    this._createDefaultRecipeStore();
                }
            });
        }
    }


    private _createDefaultRecipeStore() {
        let content = {};
        content['averageRating'] = 0;
        content['favoriteCount'] = 0;
        content['comments'] = [];
        this.db.doc(this.recipeID).set(content);
    }


    private _createComment(text, userDisplayName) {
        return {body: text,  user: userDisplayName};
    }



}
