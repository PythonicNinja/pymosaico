import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

import { MosaicComponent } from '../+mosaic/index';
import { HomeComponent } from '../+home/index';
import { NameListService, UserService } from '../shared/index';
import { NavbarComponent } from './navbar.component';
import { ToolbarComponent } from './toolbar.component';
import { LoginComponent } from "./login.component";
import {MosaicService} from "../shared/services/mosaic.service";
import {MosaicCreateComponent} from "../+mosaic/components/mosaic.create.component";
import {FoldersService} from "../shared/services/folders.service";
import {LogoutComponent} from "./logout.component";
//import {LoggedInRouterOutlet} from "./logged.in.outlet";

@Component({
  selector: 'sd-app',
  viewProviders: [NameListService, UserService, MosaicService, FoldersService],
  templateUrl: 'app/components/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent, LoginComponent, LogoutComponent],
  providers: [HTTP_PROVIDERS],
})
@Routes([
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/mosaic',
    component: MosaicComponent,
  },
  {
    path: '/mosaic-create',
    component: MosaicCreateComponent,
  },
])
export class AppComponent {
  isLoggedIn: boolean = false;
  constructor(public userService: UserService) {
    this.isLoggedIn = this.userService.isLoggedIn();
  }
}
