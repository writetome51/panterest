import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {SearchResultRecipe} from '../interfaces/SearchResultRecipe';
import {SearchResult} from '../interfaces/SearchResult';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'api-service-test',
  templateUrl: './api-service-test.component.html',
  styleUrls: ['./api-service-test.component.css']
})
export class ApiServiceTestComponent implements OnInit, OnDestroy {

  result: any;
  searchSubscription: Subscription;

  constructor(private _api: ApiService) { }

  ngOnInit() {
    this.searchSubscription = this._api.search('butter',
      (response: SearchResult) => {
        let recipes: SearchResultRecipe[] =  this._narrowSearchByTitle(response, 'butter');
        this.result = JSON.stringify(recipes[0]);
        console.log(this.result);
      });
  }


  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }


  private _narrowSearchByTitle(result, recipeSearch): SearchResultRecipe[] {
    // console.log(result.recipes);
    let narrowedResults = [];
    result.recipes.forEach((recipe) => {
      let lowercaseRecipeSearch = recipeSearch.toLowerCase();
      let lowercaseTitle = recipe.title.toLowerCase();
      if (lowercaseTitle.indexOf(lowercaseRecipeSearch) > -1) {
        narrowedResults.push(recipe);
      }
    });
    return narrowedResults;
  }



}
