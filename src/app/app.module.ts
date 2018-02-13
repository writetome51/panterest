import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FeaturedRecipesComponent} from './featured-recipes/featured-recipes.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RecipesComponent} from './recipes/recipes.component';
import { ApiService } from './services/api.service';
import {HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {RouterModule} from "@angular/router";
import {RoutesModule} from "./routes/routes.module";
import { BrowseWindowComponent } from './browse-window/browse-window.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FeaturedRecipesComponent,
    SideBarComponent,
    RecipesComponent,
    SearchComponent,
    LoginComponent,
    SignUpComponent,
    BrowseWindowComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    RouterModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
