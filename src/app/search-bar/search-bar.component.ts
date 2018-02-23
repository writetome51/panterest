import {Component, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    searchText = '';

    constructor(private _searcher: SearchService) {
    }

    ngOnInit() {
    }

    search() {
    }

}
