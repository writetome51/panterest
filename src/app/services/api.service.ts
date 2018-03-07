import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from '../interfaces/Observer';
import {SearchResultRecipe} from '../interfaces/SearchResultRecipe';
import {Subscription} from 'rxjs/Subscription';
import {environment as e} from '../../environments/environment';

@Injectable()
export class ApiService {

    constructor(private _http: HttpClient) {
    }


    getTopRated(resultPage, observer): Subscription {
        return this._getTopRatedAndGetObservable(resultPage)
            .subscribe(observer);
    }


    search(recipeSearch: string,
           resultPage: number,
           observer: Observer): Subscription {
        return this._searchAndGetObservable(recipeSearch, resultPage)
            .subscribe(observer);
    }


    getSpecificRecipe(recipeId: string, observer: Observer): Subscription {
        return this._getSpecificRecipeAsObservable(recipeId)
            .subscribe((response) => {
                observer(response.recipe);
            });
    }


    getRecipeID(recipe: SearchResultRecipe) {
        return recipe.recipe_id;
    }


    private _getTopRatedAndGetObservable(resultPage) {
        let keyValueList = [e.api.pageParam, String(resultPage)]; // alternating key and value;
        let getParameters = this._createGetParameters(keyValueList);
        return this._getRequest(
            this._createRequestUrl('search', getParameters)
        );
    }


    private _searchAndGetObservable(recipeSearch, resultPage): Observable<any> {

        let getParameters = this._createGetParameters([
            e.api.queryParam, recipeSearch,
            e.api.pageParam, String(resultPage)
        ]);
        return this._getRequest(
            this._createRequestUrl('search', getParameters)
        );
    }


    private _getSpecificRecipeAsObservable(recipeId): Observable<any> {
        let keyValueList = [e.api.recipeIDParam, recipeId];
        let getParameters = this._createGetParameters(keyValueList);
        return this._getRequest(
            this._createRequestUrl('specific', getParameters)
        );
    }


    // parameter keyValueArray must alternate in this order:
    // [key1, key1's value,  key2, key2's value, and so on...]
    private _createGetParameters(keyValueArray) {
        let getParameters = '?' + e.api.keyParamValuePair;
        for (let i = 0; i < keyValueArray.length; i += 2) {
            getParameters += ('&' + keyValueArray[i] + '=' + keyValueArray[i + 1]);
        }
        return getParameters;
    }


    private _getRequest(url) {
        return this._http.get(url, e.api.httpOptions);
    }


    private _createRequestUrl(searchType, getParameters) {
        let fullUrl = '';

        if (searchType === 'search') {
            fullUrl = e.api.baseSearchUrl + getParameters;
        }
        else if (searchType === 'specific') {
            fullUrl = e.api.baseRecipeRequestUrl + getParameters;
        }
        return fullUrl;
    }


}
