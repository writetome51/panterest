import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FeaturedRecepieComponent } from './featured-recepie/featured-recepie.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RecepiesComponent } from './recepies/recepies.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FeaturedRecepieComponent,
    SideBarComponent,
    RecepiesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
