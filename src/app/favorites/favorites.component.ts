import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {UserService} from '../services/user.service';
import {SpecificRecipe} from '../interfaces/SpecificRecipe';
import {Subscription} from 'rxjs/Subscription';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {

    loadingSpinner = environment.loadingSpinner;
    favorites: SpecificRecipe[];
    favoritesSubscription: Subscription;

  constructor(public user: UserService) { }

  ngOnInit() {
      this.user.data.getFavorites((favorites) => {
          this.favorites = Object.values(favorites);
      });
  }

  ngOnDestroy(){
    this.user.subscription.unsubscribe();
  }

}
