import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

    dropdownCategories = {
        Breakfast: ['French Toast', 'Pancakes', 'Breakfast Burrito'],
        Lunch: ['Soup', 'Salad', 'Sandwiches'],
        Dinner: ['Chicken', 'Roast', 'Pasta']
    };

    dropdownCategoryTitles = Object.keys(this.dropdownCategories);


  constructor(public searcher: SearchService) { }

  ngOnInit() {
  }


  search(recipe){
      this.searcher.searchText = recipe;
      this.searcher.pageNumber = 1;
      this.searcher.search();
  }

}
