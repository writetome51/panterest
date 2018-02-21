import { Component, OnInit } from '@angular/core';
import {SearchService} from "../services/search.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent   implements OnInit {

  JSON = JSON;
  result;
  recipeId: string;


  constructor(private search: SearchService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.recipeId = this.activatedRoute.snapshot.params['recipe_id'];
  }

  ngOnInit() {
    // just a test:
    // this.search('cupcake', 'result');
    this.search.getSpecificRecipe('recipe_id', (response) => {
      this.result = response;
    });
  }

}
