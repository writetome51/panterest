import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchResultRecipe} from '../interfaces/SearchResultRecipe';
import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-featured-recipes',
  templateUrl: './featured-recipes.component.html',
  styleUrls: ['./featured-recipes.component.css']
})
export class FeaturedRecipesComponent implements OnInit, OnDestroy {

  recipes: SearchResultRecipe[];

  constructor(private _searcher: SearchService) {
  }

  ngOnInit() {
    this.getFeatured();
  }

  ngOnDestroy(){
    this._searcher.subscription.unsubscribe();
  }


  getFeatured() {
    this._searcher.getTopRated(1, (response) => {
      this.recipes = response.recipes;
      console.log(this.recipes);
    });
  }

}
