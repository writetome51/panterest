import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  constructor(private _searcher: SearchService) { }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

}
