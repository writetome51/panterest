import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ApiService} from './api.service';
import {SearchResult} from '../interfaces/SearchResult';
import {SearchResultRecipe} from '../interfaces/SearchResultRecipe';
import {SpecificRecipe} from '../interfaces/SpecificRecipe';
import {Observer} from '../interfaces/Observer';

@Injectable()
export class SearchService {

  subscription: Subscription;

  constructor(private _api: ApiService) {
  }


  getTopRated(resultPage: number,
              functionThatManipulatesResponse: Observer) {
    this.subscription = this._api.getTopRated(resultPage, functionThatManipulatesResponse);
  }

  /**  Example of use:
   * Inject this service into a component, and call its property 'searchService'.
   * Now, to call the search() method:
   this.searchService.search('whatever recipe',
   (response) => {
        this.componentPropertyName = response;
      }
   );
   */
  search(recipeSearch, resultPage: number,
         functionThatManipulatesResponse: Observer) {
    this.subscription = this._api.search(
      recipeSearch, resultPage,
      (response: SearchResult) => {
        let narrowedResult = this._narrowResultByTitle(response, recipeSearch);
        functionThatManipulatesResponse(narrowedResult);
      }
    );
  }


  getSpecificRecipe(recipeID: string,
                    functionThatManipulatesResponse: Observer) {
    this.subscription = this._api.getSpecificRecipe(recipeID, functionThatManipulatesResponse);
  }


  getRecipeID(recipe: SearchResultRecipe) {
    return recipe.recipe_id;
  }


  searchAndGetPropertyFromEach(recipeSearch,
                               propertyToReturn,
                               functionThatManipulatesResponse: Observer) {
    this.subscription = this._api.search(
      recipeSearch, 1,
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
