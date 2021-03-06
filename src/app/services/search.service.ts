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
    results: SearchResultRecipe[];
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


    decideWhatSearchToPerform(){
        if (this.searchText === ''){
            this.getTopRated();
        }
        else{ this.search(); }
    }


    getSpecificRecipe(recipeID: string,
                      observer: Observer) {
        this.subscription = this._api.getSpecificRecipe(recipeID, observer);
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
        this.showNext = true;
        if (this.pageNumber > 1) {
            this.showPrevious = true;
        }
        else { this.showPrevious = false;  }

        if (this.results.length === 0){
            this.showNext = false;
        }
    }


}
