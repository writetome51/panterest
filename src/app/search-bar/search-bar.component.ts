import {Component, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    page = 1;


    constructor(private _activatedRoute: ActivatedRoute,
                public searcher: SearchService) {
    }

    ngOnInit() {
    }


    changeResults(){
     //   this.page = this._activatedRoute.snapshot.params['page_number'];
        if (this.searcher.searchText === ''){
            this.searcher.getTopRated(this.page);
        }
        else {
            this.searcher.search(this.page);
        }
    }

}
