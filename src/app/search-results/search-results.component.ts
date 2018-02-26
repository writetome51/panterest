import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {ActivatedRoute} from '@angular/router';
import {SpecificRecipe} from '../interfaces/SpecificRecipe';
import {SearchResultRecipe} from '../interfaces/SearchResultRecipe';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit, OnDestroy, OnChanges {

    searchText: string;
    results: SearchResultRecipe[];
    JSON = JSON;

    constructor(private _searcher: SearchService,
                private _activatedRoute: ActivatedRoute)
    {
        this._searcher.searchText = this._activatedRoute.snapshot.params['search_text'];
    }

    ngOnInit() {
        this._searcher.search(this._searcher.searchText, 1, (results) => {
            this.results = results;
            console.log(results);
        });
    }

    ngOnChanges(){
        this._searcher.search(this._searcher.searchText, 1, (results) => {
            this.results = results;
            console.log(results);
        });
    }

    ngOnDestroy() {
        this._searcher.subscription.unsubscribe();
    }

}
