import {Injectable} from '@angular/core';
import {Observer} from '../interfaces/Observer';
import {SearchResultRecipe} from '../interfaces/SearchResultRecipe';
import {Subscription} from 'rxjs/Subscription';
import {SpecificRecipe} from '../interfaces/SpecificRecipe';
import {ApiHelperService} from './api-helper.service';

@Injectable()
export class ApiService {

    constructor(private _helper: ApiHelperService) {
    }


    getTopRated(resultPage, observer): Subscription {
        return this._helper.getTopRatedAndGetObservable(resultPage)
            .subscribe(observer);
    }


    search(recipeSearch: string,
           resultPage: number,
           observer: Observer): Subscription {
        return this._helper.searchAndGetObservable(recipeSearch, resultPage)
            .subscribe(observer);
    }


    getSpecificRecipe(recipeId: string, observer: Observer): Subscription {
        return this._helper.getSpecificRecipeAsObservable(recipeId)
            .subscribe((response) => {
                observer(response.recipe);
            });
    }


    getRecipeID(recipe: SearchResultRecipe | SpecificRecipe) {
        return recipe.recipe_id;
    }


}
