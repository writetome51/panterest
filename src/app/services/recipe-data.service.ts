import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs/Subscription';
import {FirestoreDataService} from './firestore-data.service';

@Injectable()
export class RecipeDataService extends FirestoreDataService {

    id: string;
    commentText = '';
    comments: object[];


    constructor(firestore: AngularFirestore) {
        super(firestore);
    }


    setup(recipeID){
        this.id = recipeID;
        super.setup('recipes', this.id, this._createDefaultRecipe());
        this._set_comments();
    }


    addComment(userDisplayName){
        let comment = this._createComment(userDisplayName);
        this.commentText = '';
        this.subscription = this.getEntire((recipe) => {
            recipe.comments.push(comment);
            this.update(recipe);
            // This line is added to keep this block of code from repeating endlessly:
            this.subscription.unsubscribe();
        });
    }


    private _set_comments(){
        this.comments = [];
        this.subscription = this.getProperty('comments', (comments) => {
            this.comments = comments;
        });
    }


    private _createDefaultRecipe() {
        let content = {};
        content['averageRating'] = 0;
        content['favoriteCount'] = 0;
        content['comments'] = [];
        return content;
    }


    private _createComment(userDisplayName) {
        return {body: this.commentText,  user: userDisplayName};
    }


}
