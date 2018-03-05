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
    }

    ngOnInit(){
        this.searcher.pageNumber = this.activatedRoute.snapshot.params['page_number'];
        this.decideWhatSearchToPerform();
        this.toggleButtonState();
    }

    ngOnDestroy(){
        this.searcher.subscription.unsubscribe();
    }


    forwardOne(){
       ++this.searcher.pageNumber;
       this.doSearchAndSetNextPreviousButtons();
    }

    backOne(){
        --this.searcher.pageNumber;
        this.doSearchAndSetNextPreviousButtons();
    }


    doSearchAndSetNextPreviousButtons(){
        this.decideWhatSearchToPerform();
        this.toggleButtonState();
    }


    decideWhatSearchToPerform(){
        if (this.searcher.searchText === ''){
            this.getFeatured();
        }
        else{
            this.getSearchResults();
        }
    }


    getSearchResults(){
        this.searcher.search();
    }


    getFeatured(){
        this.searcher.getTopRated();
    }


    toggleButtonState() {

    }

}
