import { Component, OnInit } from '@angular/core';
import {SearchComponent} from '../search/search.component';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent extends SearchComponent  implements OnInit {

  JSON = JSON;

  constructor(_api: ApiService) {
    super(_api);
  }

  ngOnInit() {
    // just a test:
    // this.search('cupcake', 'result');
    this.getSpecificRecipe('8f47af', 'result');
  }

}
