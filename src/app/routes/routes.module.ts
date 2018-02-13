import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {SignUpComponent} from '../sign-up/sign-up.component';
import {AuthGuard} from '../auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },

      // Uncomment this when ready to use:
      // { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] }
    ]),
    CommonModule
  ],
  declarations: []
})
export class RoutesModule { }
