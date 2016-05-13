import { FORM_DIRECTIVES } from '@angular/common';
import { Component } from '@angular/core';

import {LoginComponent} from "../../components/login.component";
import {UserService} from "../../shared/services/user.service";
import {RegisterComponent} from "../../components/register.component";

@Component({
  selector: 'sd-home',
  templateUrl: 'app/+home/components/home.component.html',
  styleUrls: ['app/+home/components/home.component.css'],
  directives: [LoginComponent, RegisterComponent]
})
export class HomeComponent {
  constructor(public userService:UserService) {}
}
