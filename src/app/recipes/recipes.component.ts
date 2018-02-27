import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

  JSON = JSON;
  result: any;
  recipeId: string;
  ingredients: string[];
  pattern: RegExp = new RegExp('([a-zA-Z 0-9])');



  constructor(private search: SearchService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _location: Location) {

    this.recipeId = this.activatedRoute.snapshot.params['recipe_id'];
  }

  ngOnInit() {
    this.search.getSpecificRecipe(this.recipeId, (response) => {
      this.result = response;
    });
  }

  ngOnDestroy() {
    this.search.subscription.unsubscribe();
  }

  goBack() {
    this._location.back();
  }

}
