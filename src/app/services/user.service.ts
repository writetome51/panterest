import { Injectable } from '@angular/core';
import {UserStore} from '../interfaces/UserStore';
import {Favorite} from '../interfaces/Favorite';
import {UserDataService} from './user-data.service';

@Injectable()
export class UserService {

  constructor(private _userData: UserDataService) { }



    addNewFavorite(favorite: Favorite){
        this._userData.store.valueChanges().subscribe((response: UserStore) => {
            let obj = response;
            obj.favorites[favorite.name] = favorite.content;
            this._userData.store.update(obj);
        });
    }

}
