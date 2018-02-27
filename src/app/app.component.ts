import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserDataService} from './services/user-data.service';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'Panterest';

  constructor(private _userData: UserDataService, public user: UserService){
  }

  ngOnDestroy(){
      this._userData.subscription.unsubscribe();
  }
}
