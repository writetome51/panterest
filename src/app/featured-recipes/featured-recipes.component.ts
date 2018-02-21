import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchResultRecipe} from '../interfaces/SearchResultRecipe';
import {SearchService} from '../services/search.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-featured-recipes',
  templateUrl: './featured-recipes.component.html',
  styleUrls: ['./featured-recipes.component.css']
})
export class FeaturedRecipesComponent implements OnInit, OnDestroy {

  recipes: SearchResultRecipe[];
  recipeId: string;

  constructor(private _searcher: SearchService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.recipeId = this.activatedRoute.snapshot.params['recipe_id'];
  }

  ngOnInit() {
    this.getFeatured();
  }

  ngOnDestroy() {
    this._searcher.subscription.unsubscribe();
  }


  getFeatured() {
    this._searcher.getTopRated(1, (response) => {
      this.recipes = response.recipes;
    });
  }

}
