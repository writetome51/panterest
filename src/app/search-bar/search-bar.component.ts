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
            this.searcher.getTopRated(1);
        }
        else {
            this.searcher.search(1);
        }
    }

}
