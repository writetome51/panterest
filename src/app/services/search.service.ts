import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ApiService} from './api.service';
import {SearchResult} from '../interfaces/SearchResult';
import {SearchResultRecipe} from '../interfaces/SearchResultRecipe';
import {SpecificRecipe} from '../interfaces/SpecificRecipe';
import {SearchCallbackFunction} from '../interfaces/SearchCallbackFunction';

@Injectable()
export class SearchService {

  subscription: Subscription;

  constructor(private _api: ApiService) {
  }


  search(
    recipeSearch, functionThatManipulatesResponse: SearchCallbackFunction) {
    this.subscription = this._api.search(
      recipeSearch,
      (response: SearchResult) => {
        let narrowedResult = this._narrowResultByTitle(response, recipeSearch);
        functionThatManipulatesResponse(narrowedResult);
      }
    );
  }


  getSpecificRecipe(
    recipeID, functionThatManipulatesResponse: SearchCallbackFunction) {
    this.subscription = this._api.getSpecificRecipe(recipeID,
      (response: SpecificRecipe) => {
        functionThatManipulatesResponse(response);
      }
    );
  }


  searchAndGetPropertyFromEach(
    recipeSearch,
    propertyToReturn,
    functionThatManipulatesResponse: SearchCallbackFunction
  ) {
    this.subscription = this._api.search(
      recipeSearch,
      (response: SearchResult) => {
        let results = this._narrowResultByTitle(response, recipeSearch);
        results = this._getArrayOf(propertyToReturn, results);
        functionThatManipulatesResponse(results);
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
