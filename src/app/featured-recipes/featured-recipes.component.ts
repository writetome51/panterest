import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchResultRecipe} from '../interfaces/SearchResultRecipe';
import {SearchService} from '../services/search.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {current} from 'codelyzer/util/syntaxKind';

@Component({
    selector: 'app-featured-recipes',
    templateUrl: './featured-recipes.component.html',
    styleUrls: ['./featured-recipes.component.css']
})
export class FeaturedRecipesComponent implements OnInit, OnDestroy {

    currentStatePrev: boolean = true;
    currentStateNext: boolean = false;

    recipeId: string;
    page: number;

    loadingSpinner = environment.loadingSpinner;


    constructor(public searcher: SearchService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
        this.recipeId = this.activatedRoute.snapshot.params['recipe_id'];
        this.page = this.activatedRoute.snapshot.params[''];
    }

    ngOnInit(){
        if (this.searcher.searchText === ''){
            this.getFeatured();
        }
        else{
            this.getSearchResults();
        }
    }

    ngOnDestroy(){
        this.searcher.subscription.unsubscribe();
    }


    getSearchResults(){
        this.searcher.search(1);
    }


    getFeatured(){
        this.searcher.getTopRated(1);
    }

}
