import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SearchCallbackFunction} from './interfaces/SearchCallbackFunction';

@Injectable()
export class ApiService {

  private _apiKey = '4f5c0e8ca2c5a339763c1a9b0ce2374d';
  private _corsProxy = 'https://cors-anywhere.herokuapp.com/';
  private _baseUrl = this._corsProxy + 'http://food2fork.com/api/';
  private _baseSearchUrl = this._baseUrl + 'search';
  private _baseRecipeRequestUrl = this._baseUrl + 'get';
  private _keyParam = 'key';
  private _queryParam = 'q';
  private _recipeIDParam = 'rId';
  private _httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this._apiKey,
      'Accept': ['text/html', 'application/json'],
      'apikey': this._apiKey,
    })
  };

  constructor(private _http: HttpClient) {
  }


  search(
    recipeSearch: string, functionThatManipulatesResponse: SearchCallbackFunction
  ): void {
    this._searchAndGetObservable(recipeSearch)
    //  .subscribe(functionThatManipulatesResponse); // may need to keep this.
      .subscribe((response) => {
        response =  this._narrowSearchByTitle(response, recipeSearch);
        functionThatManipulatesResponse(response);
      });
  }


  getSpecificRecipe(recipeId: string, functionThatManipulatesResponse): void {
    this._getSpecificRecipeAsObservable(recipeId)
    .subscribe(functionThatManipulatesResponse);
  }


  private _searchAndGetObservable(recipeSearch): Observable<any> {
    // spaces in searchString probably be automatically converted
    // to %20 for us.
    let getParameters = `?${this._keyParam}=${this._apiKey}&${this._queryParam}=${recipeSearch}`;
    let fullUrl = `${this._baseSearchUrl}${getParameters}`;
    return this._http.get(fullUrl, this._httpOptions);
  }


  private _getSpecificRecipeAsObservable(recipeId): Observable<any> {
    let getParameters = `?${this._keyParam}=${this._apiKey}&${this._recipeIDParam}=${recipeId}`;
    let fullUrl = `${this._baseRecipeRequestUrl}${getParameters}`;
    return this._http.get(fullUrl, this._httpOptions);
  }


  private _narrowSearchByTitle(resultObject, recipeSearch) {
    // return modified resultObject.
  }

}


/********
 getCharacters(): Observable<Character[]> {
  return this.httpClient
    .get<Character[]>(this.characterUrl)
    .pipe(catchError(this.handleError));
}

 getCharacter(characterId: string): Observable<Character> {
  return this.httpClient
    .get<Character[]>(this.characterUrl)
    .pipe(
      map((characters: Character[]) => characters.find(character => character.id == characterId)),
      catchError(this.handleError)
    )
}

 handleError(error) {
  console.log(error);
  return Observable.throw(error.json().error || 'Server error');
}
 ******/
