import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class FoldersService {
  constructor(private http: Http, private userService: UserService) {

  }

  get_folders(): Observable {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.userService.token());

    return this.http
      .get(
        'http://127.0.0.1:8000/images/folders/viewset/',
        {},
        { headers }
      )
      .map(res => res.json())
  }

}


export function isLoggedIn() {
  return !!localStorage.getItem('auth_token');
}
