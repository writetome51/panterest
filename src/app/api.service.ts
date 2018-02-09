import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) {
  }


  search() {
    this._http.get('');
  }

}
