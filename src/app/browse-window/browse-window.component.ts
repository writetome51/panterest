import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchComponent} from '../search/search.component';
import {ApiService} from '../services/api.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-browse-window',
  templateUrl: './browse-window.component.html',
  styleUrls: ['./browse-window.component.css']
})
export class BrowseWindowComponent implements OnInit {

  recipeName: string;
  recipeImage: string;
  imageDescription: string;
  cookTime: number;
  recipeDescription: string;
  searchSubscription: Subscription;
  result: any;

  constructor() { }

  ngOnInit() {
  }

}
