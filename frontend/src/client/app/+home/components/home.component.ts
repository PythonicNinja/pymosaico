import { FORM_DIRECTIVES } from '@angular/common';
import { Component } from '@angular/core';

import { NameListService } from '../../shared/index';
import {LoginComponent} from "../../components/login.component";

@Component({
  selector: 'sd-home',
  templateUrl: 'app/+home/components/home.component.html',
  styleUrls: ['app/+home/components/home.component.css'],
  directives: [FORM_DIRECTIVES, LoginComponent]
})
export class HomeComponent {
  newName: string;
  constructor(public nameListService: NameListService) {}

}
