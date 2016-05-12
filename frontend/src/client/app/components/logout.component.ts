import { Component } from '@angular/core';

import {NameListService} from "../shared/services/name-list.service";
import {UserService} from "../shared/services/user.service";
import {Subscription} from "rxjs/Subscription";
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';

@Component({
  selector: 'sd-logout',
  providers: [UserService],
  templateUrl: 'app/components/logout.component.html',
})
export class LogoutComponent {
  isLoggedIn: boolean = false;
  constructor(public userService: UserService, private router: Router) {
    this.isLoggedIn = this.userService.isLoggedIn();
    console.log('LogoutComponent.constructor');
    console.log(this.userService.emitter);
    this.userService.emitter.subscribe((value) => {
      console.log('Islogged subscriber receive', value);
      this.isLoggedIn = value;
    });
  }

  logout(): string{
    this.isLoggedIn = false;
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
