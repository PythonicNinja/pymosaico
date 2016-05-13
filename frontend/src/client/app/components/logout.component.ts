import { Component } from '@angular/core';

import {NameListService} from "../shared/services/name-list.service";
import {UserService} from "../shared/services/user.service";
import {Subscription} from "rxjs/Subscription";
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';

@Component({
  selector: 'sd-logout',
  templateUrl: 'app/components/logout.component.html',
})
export class LogoutComponent {
  isLoggedIn: boolean = false;
  subscription: any;

  constructor(public userService: UserService, private router: Router) {
    this.isLoggedIn = this.userService.isLoggedIn();
  }

  ngOnInit() {

    this.subscription = this.userService.userChanged.subscribe(
      value => {
        console.log('Islogged subscriber receive', value);
        this.isLoggedIn = value;
      });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout(): string{
    this.isLoggedIn = false;
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
