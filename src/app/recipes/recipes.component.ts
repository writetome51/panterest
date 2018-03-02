import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../services/user.service';
import {GoogleAuthService} from '../services/google-auth.service';
import {environment} from '../../environments/environment';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

    result: any = false;
    recipeId: string;
    ingredients: string[];
    pattern: RegExp = new RegExp('([a-zA-Z 0-9])');
    favorite: boolean;
    favorites: object;
    favoritesSubscription: Subscription;
    loadingSpinner = environment.loadingSpinner;


    constructor(private search: SearchService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private _location: Location,
                public userService: UserService,
                public gAuth: GoogleAuthService) {

        this.recipeId = this.activatedRoute.snapshot.params['recipe_id'];
    }


    ngOnInit() {
        this.search.getSpecificRecipe(this.recipeId, (response) => {
            this.result = response;
            this.set_favorite();
        });

    }

    ngOnDestroy() {
        try {
            this.search.subscription.unsubscribe();
            this.userService.subscription.unsubscribe();
            this.favoritesSubscription.unsubscribe();
        }
        catch (error){}
    }


    set_favorite(){
        this.favoritesSubscription = this.userService.data.getFavorites((favorites) => {
            this.favorites = favorites;
            if (this.favorites[this.recipeId]){
                this.favorite = true;
            }
            else { this.favorite = false; }
        });
    }


    goBack() {
        this._location.back();
    }


    toggleFavorite(recipe){
        this.favoritesSubscription.unsubscribe();
        this.favorite = !(this.favorite);
        if ( ! this.favorite){
            delete this.favorites[this.recipeId];
            this.favoritesSubscription =  this.userService.removeFavorite(this.recipeId);
        }
        else{
            this.favoritesSubscription = this.userService.addNewFavorite(recipe);
            this.favorites[this.recipeId] = recipe;
        }
    }


}
