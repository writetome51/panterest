import {Injectable} from '@angular/core';
import {UserStore} from '../interfaces/UserStore';
import {Favorite} from '../interfaces/Favorite';
import {UserDataService} from './user-data.service';
import {SpecificRecipe} from '../interfaces/SpecificRecipe';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class UserService {

    // magic variable:  loggedIn: boolean;
    // magic variable: displayName: string;
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


    get displayName(){
        return this.data.getDisplayName();
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
