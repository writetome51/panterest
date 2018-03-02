import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FeaturedRecipesComponent} from './featured-recipes/featured-recipes.component';
import {SideBarComponent} from './side-bar/side-bar.component';
import {RecipesComponent} from './recipes/recipes.component';
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
import {UserProfileComponent} from './user-profile/user-profile.component';
import {HomeComponent} from './home/home.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {SearchService} from './services/search.service';
import {UserDataService} from './services/user-data.service';
import {AuthGuard} from './guards/auth.guard';
import {ProfileDetailComponent} from './profile-detail/profile-detail.component';
import {UserService} from './services/user.service';

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
        ProfileDetailComponent
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
            {path: '**', redirectTo: 'home'}
        ]),
    ],
    providers: [ApiService, GoogleAuthService, SearchService,
        UserDataService, UserService, AuthGuard],

    bootstrap: [AppComponent]
})
export class AppModule {
}
