import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FeaturedRecipesComponent} from './featured-recipes/featured-recipes.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RecipesComponent} from './recipes/recipes.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {RouterModule} from "@angular/router";
import {RoutesModule} from "./routes/routes.module";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FeaturedRecipesComponent,
    SideBarComponent,
    RecipesComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
