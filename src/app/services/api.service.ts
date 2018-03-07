import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from '../interfaces/Observer';
import {SearchResultRecipe} from '../interfaces/SearchResultRecipe';
import {Subscription} from 'rxjs/Subscription';
import {SpecificRecipe} from '../interfaces/SpecificRecipe';

@Injectable()
export class ApiService {

    private _corsProxy = 'https://cors-anywhere.herokuapp.com/';
    private _baseUrl = this._corsProxy + 'http://food2fork.com/api/';
    private _baseSearchUrl = this._baseUrl + 'search';
    private _baseRecipeRequestUrl = this._baseUrl + 'get';
    private _keyParam = 'key';
    private _apiKey = '4f5c0e8ca2c5a339763c1a9b0ce2374d';
    private _keyParamValuePair = this._keyParam + '=' + this._apiKey;
    private _queryParam = 'q';
    private _recipeIDParam = 'rId';
    private _pageParam = 'page';
    private _httpOptions = {
        headers: new HttpHeaders({
            'Authorization': this._apiKey,
            'Accept': ['text/html', 'application/json'],
            'apikey': this._apiKey,
        })
    };

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


    getRecipeID(recipe: SearchResultRecipe | SpecificRecipe) {
        return recipe.recipe_id;
    }


    private _getTopRatedAndGetObservable(resultPage) {
        let keyValueList = [this._pageParam, String(resultPage)]; // alternating key and value;
        let getParameters = this._createGetParameters(keyValueList);
        return this._searchRequest(getParameters);
    }


    private _searchAndGetObservable(recipeSearch, resultPage): Observable<any> {

        let getParameters = this._createGetParameters([
            this._queryParam, recipeSearch,
            this._pageParam, String(resultPage)
        ]);
        return this._searchRequest(getParameters);
    }


    private _getSpecificRecipeAsObservable(recipeId): Observable<any> {
        let keyValueList = [this._recipeIDParam, recipeId];
        let getParameters = this._createGetParameters(keyValueList);
        return this._specificRequest(getParameters);
    }


    private _specificRequest(getParameters): Observable<any> {
        return this._getRequest(
            this._createRequestUrl('specific', getParameters)
        );
    }


    private _searchRequest(getParameters): Observable<any> {
        return this._getRequest(
            this._createRequestUrl('search', getParameters)
        );
    }


    private _getRequest(url): Observable<any> {
        return this._http.get(url, this._httpOptions);
    }


    private _createRequestUrl(searchType, getParameters) {
        let fullUrl = '';

        if (searchType === 'search') {
            fullUrl = this._baseSearchUrl + getParameters;
        }
        else if (searchType === 'specific') {
            fullUrl = this._baseRecipeRequestUrl + getParameters;
        }
        return fullUrl;
    }


    // parameter keyValueArray must alternate in this order:
    // [key1, key1's value,  key2, key2's value, and so on...]
    private _createGetParameters(keyValueArray) {
        let getParameters = '?' + this._keyParamValuePair;
        for (let i = 0; i < keyValueArray.length; i += 2) {
            getParameters += ('&' + keyValueArray[i] + '=' + keyValueArray[i + 1]);
        }
        return getParameters;
    }

}
