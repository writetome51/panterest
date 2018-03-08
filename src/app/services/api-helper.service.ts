import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApiHelperService {

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
    private _getParameters: string;
    private _requestUrl: string;


    constructor(private _http: HttpClient) {
    }


    getTopRatedAsObservable(resultPage) {
        let keyValueArray = [this._pageParam, String(resultPage)]; // alternating key and value;
        this._set_getParameters(keyValueArray);
        return this._requestAsObservable('search');
    }


    searchAsObservable(recipeSearch, resultPage): Observable<any> {
        this._set_getParameters([
            this._queryParam, recipeSearch,
            this._pageParam, String(resultPage)
        ]);
        return this._requestAsObservable('search');
    }


    getSpecificRecipeAsObservable(recipeId): Observable<any> {
        let keyValueArray = [this._recipeIDParam, recipeId];
        this._set_getParameters(keyValueArray);
        return this._requestAsObservable('specific');
    }


    private _requestAsObservable(searchType){
        this._set_requestUrl(searchType);
        return this._getRequest();
    }


    private _getRequest(): Observable<any> {
        return this._http.get(this._requestUrl, this._httpOptions);
    }


    private _set_requestUrl(searchType) {
        if (searchType === 'search') {
            this._requestUrl = this._baseSearchUrl + this._getParameters;
        }
        else if (searchType === 'specific') {
            this._requestUrl = this._baseRecipeRequestUrl + this._getParameters;
        }
    }


    // parameter keyValueArray must alternate in this order:
    // [key1, key1's value,  key2, key2's value, and so on...]
    private _set_getParameters(keyValueArray) {
        this._getParameters = '?' + this._keyParamValuePair;
        for (let i = 0; i < keyValueArray.length; i += 2) {
            this._getParameters += ('&' + keyValueArray[i] + '=' + keyValueArray[i + 1]);
        }
    }


}
