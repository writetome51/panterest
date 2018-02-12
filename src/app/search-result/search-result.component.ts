import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ApiService} from '../services/api.service';
import {SearchResult} from '../interfaces/SearchResult';
import {SearchResultRecipe} from '../interfaces/SearchResultRecipe';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  searchSubscription: Subscription;
  result: any;
  publisher: string;

  constructor(private _api: ApiService) {
  }

  ngOnInit() {
    // sets this.result to array of recipe titles:
    this.searchAndGetPropertyFromEach('cupcake', 'publisher_url', 'result');
   // this.search('cupcake', 'publisher');
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }


  search(recipeSearch, propertyToAssignResultTo: string) {
    this.searchSubscription = this._api.search(
      recipeSearch,
      (response: SearchResult) => {
        this[propertyToAssignResultTo] = this._narrowResultByTitle(response, recipeSearch);
      }
    );
  }


  searchAndGetPropertyFromEach(recipeSearch, propertyToReturn, propertyToAssignResultTo) {
    this.searchSubscription = this._api.search(
      recipeSearch,
      (response: SearchResult) => {
        let results = this._narrowResultByTitle(response, recipeSearch);
        this[propertyToAssignResultTo] = this.getArrayOf(propertyToReturn, results);
      }
    );
  }


  getArrayOf(thisProperty, results) {
    let properties = [];
    results.forEach((result) => {
      properties.push(result[thisProperty]);
    });
    return properties;
  }


  private _narrowResultByTitle(result, recipeSearch): SearchResultRecipe[] {
    const narrowedResults = [];

    result.recipes.forEach((recipe) => {
      const lowercaseRecipeSearch = recipeSearch.toLowerCase();
      const lowercaseTitle = recipe.title.toLowerCase();
      if (lowercaseTitle.indexOf(lowercaseRecipeSearch) > -1) {
        narrowedResults.push(recipe);
      }
    });
    return narrowedResults;
  }


}
