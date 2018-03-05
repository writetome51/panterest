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

    showPrevious: boolean;
    showNext: boolean;

    page: number;

    loadingSpinner = environment.loadingSpinner;


    constructor(public searcher: SearchService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {

        this.page = this.activatedRoute.snapshot.params['page_number'];
    }

    ngOnInit(){
        this.searcher.pageNumber = this.activatedRoute.snapshot.params['page_number'];
        this.decideWhatSearchToPerform();
        this.toggleButtonState();
    }

    ngOnDestroy(){
        this.searcher.subscription.unsubscribe();
    }


    decideWhatSearchToPerform(){
        if (this.searcher.searchText === ''){
            this.getFeatured();
        }
        else{
            this.getSearchResults();
        }
    }


    forwardOne(){
       ++this.searcher.pageNumber;
       this.decideWhatSearchToPerform();
       this.toggleButtonState();
    }

    backOne(){
        --this.searcher.pageNumber;
        this.decideWhatSearchToPerform();
        this.toggleButtonState();
    }


    getSearchResults(){
        this.searcher.search();
    }


    getFeatured(){
        this.searcher.getTopRated();
    }


    toggleButtonState() {
        if (this.searcher.pageNumber < 2) {
            this.showPrevious = false;
            this.showNext = true;
        }

        else {
            this.showPrevious = true;
            this.showNext = true;
        }
    }

}
