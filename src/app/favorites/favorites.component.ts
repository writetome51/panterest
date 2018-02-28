import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {UserService} from '../services/user.service';
import {SpecificRecipe} from '../interfaces/SpecificRecipe';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {

    loadingSpinner = '../../../assets/loading_spinner.gif';
    favorites: SpecificRecipe[];
    favoritesSubscription: Subscription;

  constructor(public user: UserService) { }

  ngOnInit() {
      this.favoritesSubscription = this.user.data.getFavorites((favorites) => {
          this.favorites = Object.values(favorites);
      });
  }

  ngOnDestroy(){
      this.favoritesSubscription.unsubscribe();
  }

}
