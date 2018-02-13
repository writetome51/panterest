import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ApiService} from '../services/api.service';
import {SearchResult} from '../interfaces/SearchResult';
import {SearchResultRecipe} from '../interfaces/SearchResultRecipe';
import {SpecificRecipe} from '../interfaces/SpecificRecipe';

// This decorator only here because it's required:
@Component({
  template: ''
})

// Intended to be extended by any component that needs to search recipes:
export class SearchComponent implements OnInit, OnDestroy {

  searchSubscription: Subscription;
  result: any;

  constructor(private _api: ApiService) {
  }

  ngOnInit() {
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


  getSpecificRecipe(recipeID, propertyToAssignResultTo) {
    this.searchSubscription = this._api.getSpecificRecipe(recipeID,
      (response: SpecificRecipe) => {
        this[propertyToAssignResultTo] = response;
      }
    );
  }


  // Example:  sets this.result to array of cupcake recipe titles:
  // this.searchAndGetPropertyFromEach('cupcake', 'title', 'result');
  searchAndGetPropertyFromEach(recipeSearch, propertyToReturn, propertyToAssignResultTo) {
    this.searchSubscription = this._api.search(
      recipeSearch,
      (response: SearchResult) => {
        let results = this._narrowResultByTitle(response, recipeSearch);
        this[propertyToAssignResultTo] = this._getArrayOf(propertyToReturn, results);
      }
    );
  }


  private _getArrayOf(thisProperty, results) {
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
