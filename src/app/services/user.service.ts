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

    constructor(public data: UserDataService) {
        this.subscription = this.data.subscription;
    }


    login(){
        this.data.login();
    }

    logout(){
        this.data.logout();
    }


    addNewFavorite(recipe: SpecificRecipe) {
        let favorite: Favorite = this.data.createFavorite(recipe);
        return this.data.store.valueChanges().subscribe((userStore: UserStore) => {
            userStore.favorites[favorite.name] = favorite.content;
            this.data.update(userStore);
        });
    }


    removeFavorite(recipeId){
        return this.data.store.valueChanges().subscribe((userStore: UserStore) => {
            delete userStore.favorites[recipeId];
            this.data.update(userStore);
        });
    }


    get loggedIn() {
        try {
            return Boolean(this.data.isLoggedInLocalState());
        }
        catch (error){
            return false;
        }

    }
}
