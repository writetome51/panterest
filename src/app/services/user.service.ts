import {Injectable} from '@angular/core';
import {UserStore} from '../interfaces/UserStore';
import {Favorite} from '../interfaces/Favorite';
import {UserDataService} from './user-data.service';
import {SpecificRecipe} from '../interfaces/SpecificRecipe';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class UserService {

    loggedIn: boolean;
    subscription: Subscription;
    user;

    constructor(private _userData: UserDataService) {
        //  this._userData.setLoggedIn(this.loggedIn);
        this.set_user();
        console.log(this.user);
    }

    set_user() {
        if (this._userData) {
            this.user = this._userData.user;
        }
    }


    addNewFavorite(recipe: SpecificRecipe) {
        let favorite: Favorite = this._createFavorite(recipe);
        this._userData.store.valueChanges().subscribe((response: UserStore) => {
            let userStore = response;
            userStore.favorites[favorite.name] = favorite.content;
            this._userData.update(userStore);
        });
    }


    private _createFavorite(recipe: SpecificRecipe) {
        let favorite = {name: '', content: {}};
        favorite.name = recipe.recipe_id;
        favorite.content = recipe;
        return favorite;
    }

}
