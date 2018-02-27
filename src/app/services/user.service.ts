import {Injectable} from '@angular/core';
import {UserStore} from '../interfaces/UserStore';
import {Favorite} from '../interfaces/Favorite';
import {UserDataService} from './user-data.service';
import {SpecificRecipe} from '../interfaces/SpecificRecipe';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class UserService {

    // magic variable:  loggedIn: boolean;
    subscription: Subscription;

    constructor(private data: UserDataService) {
        this.subscription = this.data.subscription;
    }


    login(){

    }

    logout(){
        this.data.unsetLoggedInLocalState();
    }


    addNewFavorite(recipe: SpecificRecipe) {
        let favorite: Favorite = this._createFavorite(recipe);
        this.data.store.valueChanges().subscribe((userStore: UserStore) => {
            userStore.favorites[favorite.name] = favorite.content;
            this.data.update(userStore);
        });
    }


    private _createFavorite(recipe: SpecificRecipe) {
        let favorite = {name: '', content: {}};
        favorite.name = recipe.recipe_id;
        favorite.content = recipe;
        return favorite;
    }


    get loggedIn(){
        return Boolean(this.data.isLoggedInLocalState());
    }

}
