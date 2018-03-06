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
    id: string;
    store: AngularFirestoreDocument<object>;
    commentText = '';
    comments: object[];


    constructor(private firestore: AngularFirestore,
                private _api: ApiService) {
    }


    setup(recipeID){
        this.id = recipeID;
        this._set_db();
        this._set_store();
    }


    update(newData: object) {
        this.store.update(newData);
    }


    addComment(userDisplayName){
        let comment = this._createComment(userDisplayName);
        this.subscription = this.store.valueChanges().subscribe((recipe) => {
            recipe.comments.push(comment);
            this.update(recipe);
            // This line is added to keep this block of code from repeating endlessly:
            this.subscription.unsubscribe();
        });
    }


    private _set_db() {
        this.db = this.firestore.collection('recipes');
    }


    private _set_store() {
        if (this.id) {
            // The document object is named after recipe's id:
            this.store = this.db.doc(this.id);

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
        this.db.doc(this.id).set(content);
    }


    private _createComment(userDisplayName) {
        return {body: this.commentText,  user: userDisplayName};
    }



}
