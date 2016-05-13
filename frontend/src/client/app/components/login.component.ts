import { Component } from '@angular/core';

import {UserService} from "../shared/services/user.service";
import {Subscription} from "rxjs/Subscription";
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';

@Component({
  selector: 'sd-login',
  templateUrl: 'app/components/login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errors: [any] = [];
  isLoggedIn: boolean = false;
  constructor(public userService: UserService, private router: Router) {
    this.isLoggedIn = this.userService.isLoggedIn();
  }

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
  }

  login(): any {
    var that = this;
    this.userService.login(this.username, this.password)
      .subscribe(
        data => {
          if (data.key) {
            that.userService.setToken(data.key);
            that.isLoggedIn = true;
            that.errors = [];
            that.router.navigate(['/mosaic']);
          }
        },
        err => {
          that.errors = JSON.parse(err._body);
        },
        () => {
          console.log('finished');
        }
      );
  }
  token(): string{
    return this.userService.token();
  }
}
