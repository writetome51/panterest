import { Component, OnInit } from '@angular/core';
import {SearchService} from '../services/search.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

    dropdownCategories = {
        Breakfast: ['French Toast', 'Pancakes', 'Breakfast Meats'],
        Lunch: ['Soup', 'Salad', 'Sandwiches'],
        Dinner: ['Chicken', 'Roast', 'Entrees']
    };

    dropdownCategoryTitles = Object.keys(this.dropdownCategories);


  constructor(public searcher: SearchService) { }

  ngOnInit() {
  }

}
