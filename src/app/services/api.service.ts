import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscribable} from 'rxjs/Observable';
import {SearchCallbackFunction} from '../interfaces/SearchCallbackFunction';
import {SearchResult} from '../interfaces/SearchResult';
import {SearchResultRecipe} from '../interfaces/SearchResultRecipe';
import {Subscription} from 'rxjs/Subscription';

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


  getTopRated(resultPage, functionThatManipulatesResponse): Subscription{
    return this._getTopRatedAndGetObservable(resultPage)
      .subscribe(functionThatManipulatesResponse);
  }


  search(
    recipeSearch: string,
    resultPage: number,
    functionThatManipulatesResponse: SearchCallbackFunction
  ): Subscription {
    return this._searchAndGetObservable(recipeSearch, resultPage)
      .subscribe(functionThatManipulatesResponse);
  }


  getSpecificRecipe(
    recipeId: string, functionThatManipulatesResponse: SearchCallbackFunction
  ): Subscription {
    return this._getSpecificRecipeAsObservable(recipeId)
    .subscribe((response) => {
      functionThatManipulatesResponse(response.recipe);
    });
  }


  private _getTopRatedAndGetObservable(resultPage){
    // spaces in searchString probably be automatically converted
    // to %20 for us.
    let getParameters =
      `?${this._keyParamValuePair}&${this._pageParam}=${resultPage}`;
    let fullUrl = `${this._baseSearchUrl}${getParameters}`;
    return this._http.get(fullUrl, this._httpOptions);
  }


  private _searchAndGetObservable(recipeSearch, resultPage): Observable<any> {
    // spaces in searchString probably be automatically converted
    // to %20 for us.
    let getParameters =
      `?${this._keyParamValuePair}&${this._queryParam}=${recipeSearch}&${this._pageParam}=${resultPage}`;
    let fullUrl = `${this._baseSearchUrl}${getParameters}`;
    return this._http.get(fullUrl, this._httpOptions);
  }


  private _getSpecificRecipeAsObservable(recipeId): Observable<any> {
    let getParameters = `?${this._keyParamValuePair}&${this._recipeIDParam}=${recipeId}`;
    let fullUrl = `${this._baseRecipeRequestUrl}${getParameters}`;
    return this._http.get(fullUrl, this._httpOptions);
  }



}
