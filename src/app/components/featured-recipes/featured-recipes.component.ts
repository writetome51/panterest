import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../../services/search.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-featured-recipes',
    templateUrl: './featured-recipes.component.html',
    styleUrls: ['./featured-recipes.component.css']
})
export class FeaturedRecipesComponent implements OnInit, OnDestroy {

    loadingSpinner = environment.loadingSpinner;


    constructor(public searcher: SearchService,
                private activatedRoute: ActivatedRoute) {

        this.searcher.pageNumber = this.activatedRoute.snapshot.params['page_number'];
    }


    ngOnInit(){
        this.searcher.decideWhatSearchToPerform();
    }

    ngOnDestroy(){
        this.searcher.subscription.unsubscribe();
    }


    changeResultPage(plusOrMinus: number){
        // searcher.pageNumber must be coerced back into a number:
        this.searcher.pageNumber = ((this.searcher.pageNumber * 1) + Number(plusOrMinus) );
        this.searcher.decideWhatSearchToPerform();
    }


}
