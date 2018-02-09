import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) {
  }


  search(searchString) {
    this._http.get(searchString);
  }

  getSpecific() {}

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

