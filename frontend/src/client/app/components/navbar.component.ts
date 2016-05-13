import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {LogoutComponent} from "./logout.component";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'sd-navbar',
  templateUrl: 'app/components/navbar.component.html',
  styleUrls: ['app/components/navbar.component.css'],
  directives: [ROUTER_DIRECTIVES, LogoutComponent]
})
export class NavbarComponent {}
