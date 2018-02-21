import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {FavoritesComponent} from '../favorites/favorites.component';
import {RecipesComponent} from '../recipes/recipes.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
      { path: 'recipes', component: RecipesComponent }

    ]),
    CommonModule
  ],
  declarations: []
})
export class RoutesModule { }
