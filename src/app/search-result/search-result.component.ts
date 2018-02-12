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

  constructor(private _api: ApiService) {
  }

  ngOnInit() {
  this.search('cupcake', this.result);
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }


  search(recipeSearch, propertyToAssignResultTo: string) {
    this.searchSubscription = this._api.search(
      recipeSearch,
      (response: SearchResult) => {
        this[propertyToAssignResultTo] = this._narrowResultByTitle(response, recipeSearch);
        this[propertyToAssignResultTo] = this[propertyToAssignResultTo][0];
        console.log(this[propertyToAssignResultTo]);
      }
    );
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
