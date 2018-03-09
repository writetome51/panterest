import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FeaturedRecipesComponent} from './components/featured-recipes/featured-recipes.component';
import {SideBarComponent} from './components/side-bar/side-bar.component';
import {RecipesComponent} from './components/recipes/recipes.component';
import {ApiService} from './services/api.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {RoutesModule} from './routes/routes.module';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {GoogleAuthService} from './services/google-auth.service';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {HomeComponent} from './components/home/home.component';
import {FavoritesComponent} from './components/favorites/favorites.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {SearchService} from './services/search.service';
import {UserDataService} from './services/user-data.service';
import {AuthGuard} from './guards/auth.guard';
import {UserService} from './services/user.service';
import {RecipeDataService} from './services/recipe-data.service';
import {ApiHelperService} from './services/api-helper.service';

@NgModule({
    declarations: [
        AppComponent,
        FeaturedRecipesComponent,
        SideBarComponent,
        RecipesComponent,
        UserProfileComponent,
        HomeComponent,
        FavoritesComponent,
        SearchBarComponent,
    ],

    imports: [
        BrowserModule,
        RoutesModule,
        FormsModule,
        HttpClientModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp((environment.firebase)),
        AngularFireAuthModule,
        RouterModule.forRoot([
            {path: 'home/:page_number', component: HomeComponent},
            {path: '', pathMatch: 'full', redirectTo: 'home/1'},
            {path: '**', redirectTo: 'home/1'}
        ]),
    ],
    providers: [ApiService, ApiHelperService, GoogleAuthService, SearchService,
        UserDataService, UserService, RecipeDataService, AuthGuard],

    bootstrap: [AppComponent]
})
export class AppModule {
}
