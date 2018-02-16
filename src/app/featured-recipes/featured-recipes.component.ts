import { Component, OnInit } from '@angular/core';
import {SpecificRecipe} from '../interfaces/SpecificRecipe';

@Component({
  selector: 'app-featured-recipes',
  templateUrl: './featured-recipes.component.html',
  styleUrls: ['./featured-recipes.component.css']
})
export class FeaturedRecipesComponent implements OnInit {

  recipes: SpecificRecipe[];

  constructor() { }

  ngOnInit() {
  }

}
