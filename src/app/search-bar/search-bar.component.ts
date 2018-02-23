import {Component, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    searchText = '';

    constructor(private _searcher: SearchService,
                private _activatedRoute: ActivatedRoute) {

        this.searchText = this._activatedRoute.snapshot.params['search_text'];
    }


    ngOnInit() {
    }

    search() {
    }

}
