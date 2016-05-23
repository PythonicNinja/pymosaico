import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

import { MosaicComponent } from '../+mosaic/index';
import { HomeComponent } from '../+home/index';
import { UserService } from '../shared/index';
import { NavbarComponent } from './navbar.component';
import { ToolbarComponent } from './toolbar.component';
import { LoginComponent } from "./login.component";
import {MosaicService} from "../shared/services/mosaic.service";
import {MosaicCreateComponent} from "../+mosaic/components/mosaic.create.component";
import {FoldersService} from "../shared/services/folders.service";
import {LogoutComponent} from "./logout.component";
import 'rxjs/Rx';
import {RestService} from "../shared/services/rest.service";
import {FoldersComponent} from "../+mosaic/components/folders.component";
import {RegisterComponent} from "./register.component";
import {FolderCreateComponent} from "../+mosaic/components/folder.create.component";

@Component({
  selector: 'sd-app',
  viewProviders: [UserService, MosaicService, FoldersService],
  templateUrl: 'app/components/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent, LoginComponent, LogoutComponent, RegisterComponent, FoldersComponent],
  providers: [HTTP_PROVIDERS, UserService, RestService],
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
  {
    path: '/folders',
    component: FoldersComponent,
  },
  {
    path: '/folder-create',
    component: FolderCreateComponent,
  },

])
export class AppComponent {
  isLoggedIn: boolean = false;
  constructor(public userService: UserService) {
    this.isLoggedIn = this.userService.isLoggedIn();
  }
}
