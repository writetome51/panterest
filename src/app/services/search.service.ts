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
    searchText = '';
    results;
    resultsHeader: string;
    pageNumber = 1;
    showNext: boolean;
    showPrevious: boolean;


    constructor(private _api: ApiService) {
    }


    getTopRated() {
        this._clearResults();
        this.subscription = this._api.getTopRated(this.pageNumber, (response) => {
            this.resultsHeader = 'Today\'s Featured Recipes';
            this.results = response.recipes;
            this._setNextAndPreviousButtons();
        });
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

    search() {
        this._clearResults();
        this.subscription = this._api.search(
            this.searchText, this.pageNumber,
            (response: SearchResult) => {
                this.resultsHeader = 'Search Results';
                this.results = this._narrowResultByTitle(response, this.searchText);
                this._setNextAndPreviousButtons();
            }
        );
    }


    getSpecificRecipe(recipeID: string,
                      observer: Observer) {
        this.subscription = this._api.getSpecificRecipe(recipeID, observer);
    }


    getRecipeID(recipe: SearchResultRecipe) {
        return recipe.recipe_id;
    }


    private _clearResults(){
        this.resultsHeader = '';
        this.results = null;
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


    private _setNextAndPreviousButtons(){
        if (this.pageNumber < 2) {
            this.showPrevious = false;
            this.showNext = true;
            console.log(this.showPrevious);
        }
        else {
            this.showPrevious = true;
            this.showNext = true;
        }

        if (this.results.length === 0){
            this.showPrevious = false;
            this.showNext = false;
        }

    }


}
