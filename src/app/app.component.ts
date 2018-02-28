import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'Panterest';

  constructor(public user: UserService){
  }


  ngOnDestroy(){
      this.user.subscription.unsubscribe();
  }
}
