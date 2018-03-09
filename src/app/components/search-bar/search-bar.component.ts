import {Component, OnInit} from '@angular/core';
import {SearchService} from '../../services/search.service';
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
        this.searcher.pageNumber = 1;
        if (this.searcher.searchText === ''){
            this.searcher.getTopRated();
        }
        else {
            this.searcher.search();
        }
    }

}
