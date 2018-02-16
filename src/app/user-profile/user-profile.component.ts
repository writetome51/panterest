import { Component, OnInit } from '@angular/core';
import {GoogleAuthService} from '../services/google-auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public gAuth: GoogleAuthService) { }

  ngOnInit() {
  }

}
