import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchResultRecipe} from '../interfaces/SearchResultRecipe';
import {SearchService} from '../services/search.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-featured-recipes',
    templateUrl: './featured-recipes.component.html',
    styleUrls: ['./featured-recipes.component.css']
})
export class FeaturedRecipesComponent implements OnInit, OnDestroy {

    recipes: SearchResultRecipe[];
    recipeId: string;

    constructor(public searcher: SearchService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
        this.recipeId = this.activatedRoute.snapshot.params['recipe_id'];
    }

    ngOnInit(){
        if (this.searcher.searchText === ''){
            this.searcher.resultsHeader = 'Today\'s Featured Recipes';
            this.getFeatured();
        }
        else{
            this.searcher.resultsHeader = 'Search Results';
            this.getSearchResults();
        }
    }

    ngOnDestroy(){
        this.searcher.subscription.unsubscribe();
    }


    getSearchResults(){
        this.searcher.search(this.searcher.searchText, 1, (response) => {
            this.searcher.resultsHeader = 'Search Results';
            this.searcher.results = response;
        });
    }


    getFeatured(){
        this.searcher.getTopRated(1, (response) => {
            this.searcher.resultsHeader = 'Today\'s Featured Recipes';
            this.searcher.results = response.recipes;
        });
    }

}
