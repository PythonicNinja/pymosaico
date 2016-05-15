import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";
import {RestService} from "./rest.service";

@Injectable()
export class FoldersService {
  constructor(private http: Http, private restService:RestService) {

  }

  get_folders(): Observable {
    return this.restService.get('images/folders/viewset/');
  }

  createFolder(data:any, files:any): Promise {
    return this.restService.postFiles('images/folders/viewset/', 'POST', data, files);
  }

}


export function isLoggedIn() {
  return !!localStorage.getItem('auth_token');
}
