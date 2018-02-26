import {Component, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {


    constructor(private _activatedRoute: ActivatedRoute,
                public searcher: SearchService) {
    }

    ngOnInit() {
    }


    changeResults(){
        if (this.searcher.searchText === ''){
            this.searcher.resultsHeader = 'Today\'s Featured Recipes';
            this.searcher.getTopRated(1, (response) => {
                this.searcher.results = response;
            });
        }
        else {
            this.searcher.resultsHeader = 'Search Results';
            this.searcher.search(this.searcher.searchText, 1, (response) => {
                this.searcher.results = response;
            });
        }
    }

}
