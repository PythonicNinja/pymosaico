import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";
import {RestService} from "./rest.service";

@Injectable()
export class MosaicService {
  constructor(
              private restService:RestService
  ) {}

  get_mosaics():Observable {
    return this.restService.get('mosaico/viewset/');
  }


  create(data:any, files:any):Promise {
    return this.restService.postFiles('mosaico/viewset/', 'POST', data, files);
  }
}


export function isLoggedIn() {
  return !!localStorage.getItem('auth_token');
}
