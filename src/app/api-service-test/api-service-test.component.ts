import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'api-service-test',
  templateUrl: './api-service-test.component.html',
})
export class ApiServiceTestComponent implements OnInit {

  result: string;

  constructor(private _api: ApiService) { }

  ngOnInit() {

      this._api.search(
        'cake',
        (response) => {
          console.log(response);
        }
      );


      this._api.getSpecificRecipe(
        'd8a889',
        (response) => {
          console.log(response);
          this.result = JSON.stringify(response);
        }
      );
  }

}
