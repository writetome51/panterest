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
        this.page = this.activatedRoute.snapshot.params['page_number'];
    }

    ngOnInit(){
        this.searcher.pageNumber = this.activatedRoute.snapshot.params['page_number'];
        if (this.searcher.searchText === ''){
            this.getFeatured();
        }
        else{
            this.getSearchResults();
        }
        this.toggleButtonState();
    }

    ngOnDestroy(){
        this.searcher.subscription.unsubscribe();
    }


    getSearchResults(){
        ++this.searcher.pageNumber;
        this.searcher.search();
    }


    getFeatured(){
        this.searcher.getTopRated(this.page);
    }

    toggleButtonState() {
        if(this.page < 2) {
            this.currentStatePrev = true;
            this.currentStateNext = false;
        }
        else if(this.page >= ) {
            this.currentStatePrev = false;
            this.currentStateNext = true;
        }
        else {
            this.currentStateNext = false;
            this.currentStateNext = false;
        }
    }

}
