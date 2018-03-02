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

    currentState: boolean = false;

    recipeId: string;
    page: number;


    loadingSpinner = environment.loadingSpinner;


    constructor(public searcher: SearchService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
        this.recipeId = this.activatedRoute.snapshot.params['recipe_id'];

    }

    ngOnInit(){
        this.searcher.pageNumber = this.activatedRoute.snapshot.params['page_number'];
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
        ++this.searcher.pageNumber
        this.searcher.search();
    }


    getFeatured(){
        this.searcher.getTopRated(this.page);
    }



}
