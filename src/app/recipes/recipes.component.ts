import { Component, OnInit } from '@angular/core';
import {SearchService} from "../services/search.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent   implements OnInit {

  JSON = JSON;
  result;

  constructor(private search: SearchService) {

  }

  ngOnInit() {
    // just a test:
    // this.search('cupcake', 'result');
    this.search.getSpecificRecipe('8f47af', (response) => {
      this.result = response;
    });
  }

}
