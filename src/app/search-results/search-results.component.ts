import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

    searchText: string;

    constructor(private _searcher: SearchService,
                private _activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.searchText = this._activatedRoute.snapshot.params['search_text'];
    }

    ngOnDestroy() {
        this._searcher.subscription.unsubscribe();
    }

}
