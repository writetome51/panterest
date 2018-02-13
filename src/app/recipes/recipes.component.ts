import { Component, OnInit } from '@angular/core';
import {SearchComponent} from '../search/search.component';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent extends SearchComponent  implements OnInit {

  constructor(_api: ApiService) {
    super(_api);
  }

  ngOnInit() {
    this.search('cupcake', 'result');
  }

}
