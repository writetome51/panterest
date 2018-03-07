import {Injectable} from '@angular/core';
import {UserDataService} from './user-data.service';
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
            return (this.data.isLoggedInLocalState());
        }
        catch (error){
            return false;
        }

    }
}
