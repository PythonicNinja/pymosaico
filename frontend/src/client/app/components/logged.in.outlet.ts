//import {Directive, Attribute, ElementRef, DynamicComponentLoader} from '@angular/core';
//import {Router, RouteLink, ComponentInstruction, ROUTER_DIRECTIVES} from '@angular/router';
//import {LoginComponent} from './login.component';
//import {isLoggedIn} from "../shared/services/user.service";
//import {UserService} from "../shared/services/user.service";
//
//@Directive({
//  selector: 'router-outlet'
//})
//export class LoggedInRouterOutlet extends RouterOutlet {
//  publicRoutes: Array;
//  private parentRouter: Router;
//  private userService: UserService;
//
//  constructor(
//    _elementRef: ElementRef, _loader: DynamicComponentLoader,
//    _parentRouter: Router, @Attribute('name') nameAttr: string,
//    userService: UserService
//  ) {
//    super(_elementRef, _loader, _parentRouter, nameAttr);
//
//    this.parentRouter = _parentRouter;
//    this.userService = userService;
//    this.publicRoutes = [
//      '', 'login', 'signup'
//    ];
//  }
//
//  activate(instruction: ComponentInstruction) {
//    if (this._canActivate(instruction.urlPath)) {
//      return super.activate(instruction);
//    }
//
//    this.parentRouter.navigate(['/']);
//  }
//
//  _canActivate(url) {
//    return this.publicRoutes.indexOf(url) !== -1 || this.userService.isLoggedIn()
//  }
//}
