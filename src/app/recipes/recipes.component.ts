import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../services/user.service';
import {GoogleAuthService} from '../services/google-auth.service';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

    JSON = JSON;
    result: any = false;
    recipeId: string;
    ingredients: string[];
    pattern: RegExp = new RegExp('([a-zA-Z 0-9])');
    favorite = false;
    favorites: object;
    loadingSpinner = environment.loadingSpinner;


    constructor(private search: SearchService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private _location: Location,
                public user: UserService,
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
        this.search.subscription.unsubscribe();
        this.user.subscription.unsubscribe();
    }


    set_favorite(){
        this.user.data.getFavorites((favorites) => {
            this.favorites = favorites;
            if (this.favorites[this.recipeId]){
                this.favorite = true;
            }
        });
    }


    goBack() {
        this._location.back();
    }


    toggleFavorite(recipe){
        this.favorite = ( ! this.favorite);
        if (this.favorites[this.recipeId]){
            this.user.removeFavorite(this.recipeId);
        }
        else{
            this.user.addNewFavorite(recipe);
        }
    }


}
