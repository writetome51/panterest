import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {FavoritesComponent} from '../components/favorites/favorites.component';
import {RecipesComponent} from '../components/recipes/recipes.component';
import {HomeComponent} from '../components/home/home.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
            {path: 'recipes/:recipe_id', component: RecipesComponent},
            {path: 'home/:page_number', component: HomeComponent}
        ]),
        CommonModule
    ],
    declarations: []
})
export class RoutesModule {
}
