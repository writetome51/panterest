import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApiService {

  private _apiKey = '4f5c0e8ca2c5a339763c1a9b0ce2374d';
  private _baseSearchUrl = 'http://food2fork.com/api/search';

  constructor(private _http: HttpClient) {
  }


  search(recipeSearch): Observable<any> {
    // spaces in searchString probably be automatically converted
    // to %20 for us.
      let getParameters = `?key=${this._apiKey}&q=${recipeSearch}`;
      let fullUrl = `${this._baseSearchUrl}${getParameters}`;
      return this._http.get(fullUrl);
  }

  getSpecific(recipe): Observable<any> {

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

