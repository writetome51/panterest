import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {AppComponent} from "../app.component";
import {SignUpComponent} from "../sign-up/sign-up.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },

    ]),
    CommonModule
  ],
  declarations: []
})
export class RoutesModule { }
