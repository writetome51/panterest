import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../../services/search.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../../services/user.service';
import {GoogleAuthService} from '../../services/google-auth.service';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs/Subscription';
import {RecipeDataService} from '../../services/recipe-data.service';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

    result: any = false;
    ingredients: string[];
    pattern: RegExp = new RegExp('([a-z])');
    favorite: boolean;
    favorites: object;
    favoritesSubscription: Subscription;
    loadingSpinner = environment.loadingSpinner2;
    showComments = true;
    hideCommentsCommand = 'Hide Comments';
    showCommentsCommand = 'Show Comments';
    showOrHideCommand = this.hideCommentsCommand;


    constructor(private search: SearchService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private _location: Location,
                public userService: UserService,
                public recipeData: RecipeDataService,
                public gAuth: GoogleAuthService) {

        this.initializeDisplayData();
    }


    ngOnInit() {
        this.initializeDisplayData();
    }

    ngOnDestroy() {
        try {
            this.search.subscription.unsubscribe();
            this.userService.subscription.unsubscribe();
            this.favoritesSubscription.unsubscribe();
            this.recipeData.subscription.unsubscribe();
        }
        catch (error){}
    }


    initializeDisplayData(){
        let recipeId = this.activatedRoute.snapshot.params['recipe_id'];
        this.search.getSpecificRecipe(recipeId, (response) => {
            this.result = response;
            this.set_favorite();
            this.recipeData.setup(recipeId);
        });
    }


    commentsExist(){
        if (this.recipeData.comments){
            return (this.recipeData.comments.length > 0);
        }
        else return false;
    }


    set_favorite(){
        this.favoritesSubscription = this.userService.data.getFavorites((favorites) => {
            this.favorites = favorites;
            if (this.favorites[this.recipeData.id]){
                this.favorite = true;
            }
            else { this.favorite = false; }
        });
    }


    goBack() {
        this._location.back();
    }


    toggleFavorite(recipe){
        this.favoritesSubscription.unsubscribe(); // prevents infinite loop.
        this.favorite = !(this.favorite);
        if ( ! this.favorite){
            delete this.favorites[this.recipeData.id];
            this.favoritesSubscription =  this.userService.data.removeFavorite(this.recipeData.id);
        }
        else{
            this.favoritesSubscription = this.userService.data.addNewFavorite(recipe);
            this.favorites[this.recipeData.id] = recipe;
        }
    }


    addComment(){
        this.recipeData.addComment(this.userService.displayName);
    }


    toggleShowComments(){
        this.showComments = !(this.showComments);
        if ( ! this.showComments){
            this.showOrHideCommand = this.showCommentsCommand;
        }
        else{
            this.showOrHideCommand = this.hideCommentsCommand;
        }
    }



}
