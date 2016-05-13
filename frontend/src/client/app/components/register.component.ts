import { Component } from '@angular/core';

import {UserService} from "../shared/services/user.service";
import {Subscription} from "rxjs/Subscription";
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';

@Component({
  selector: 'sd-register',
  templateUrl: 'app/components/register.component.html',
})
export class RegisterComponent {
  username: string = '';
  password1: string = '';
  password2: string = '';
  errors: [any] = [];
  isLoggedIn: boolean = false;
  constructor(public userService: UserService, private router: Router) {
    this.isLoggedIn = this.userService.isLoggedIn();
  }

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
  }

  register(): any {
    var that = this;
    this.userService.register(this.username, this.password1, this.password2)
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
