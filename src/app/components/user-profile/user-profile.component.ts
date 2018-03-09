import {Component, OnInit} from '@angular/core';
import {GoogleAuthService} from '../../services/google-auth.service';
import {GoogleUser} from '../../interfaces/GoogleUser';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    user: GoogleUser;

    constructor(public gAuth: GoogleAuthService, public userService: UserService) {
    }

    ngOnInit() {
    }

}
