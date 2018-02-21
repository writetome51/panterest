import { Component, OnInit } from '@angular/core';
import {SearchResultRecipe} from '../interfaces/SearchResultRecipe';
import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-featured-recipes',
  templateUrl: './featured-recipes.component.html',
  styleUrls: ['./featured-recipes.component.css']
})
export class FeaturedRecipesComponent implements OnInit {

  recipes: SearchResultRecipe[];

  constructor(private _searcher: SearchService) {
    this.recipes = this.getFeatured();
  }

  ngOnInit() {
  }


  getFeatured(){
    let result: SearchResultRecipe[];
    return result;
  }

}
