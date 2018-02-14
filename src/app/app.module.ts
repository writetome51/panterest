import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FeaturedRecipesComponent} from './featured-recipes/featured-recipes.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RecipesComponent} from './recipes/recipes.component';
import { ApiService } from './services/api.service';
import {HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {RouterModule} from '@angular/router';
import {RoutesModule} from './routes/routes.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthService } from './services/auth.service';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowseWindowComponent } from './browse-window/browse-window.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    FeaturedRecipesComponent,
    SideBarComponent,
    RecipesComponent,
    SearchComponent,
    LoginComponent,
    SignUpComponent,
    UserProfileComponent,
    BrowseWindowComponent,
    HomeComponent,
    FavoritesComponent,
    SearchBarComponent
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
        { path: 'home', component: HomeComponent },
        { path: '', pathMatch: 'full', redirectTo: 'home' },
        { path: '**', redirectTo: 'home' }
        ]),
  ],
  providers: [ApiService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
