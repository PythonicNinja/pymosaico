import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {
  public loggedIn = false;

  public emitter: EventEmitter = new EventEmitter();

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(username:string, password:string): Observable {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(
        'http://127.0.0.1:8000/rest-auth/login/',
        JSON.stringify({ username, password }),
        { headers }
      )
      .map(res => res.json())
  }
  setToken(token:string): boolean {
    localStorage.setItem('auth_token', token);
    this.loggedIn = true;

    return this.isLoggedIn();
  }

  token(): string {
    return localStorage.getItem('auth_token');
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.emitter.emit(false);
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('auth_token');
  }
}


export function isLoggedIn() {
  return !!localStorage.getItem('auth_token');
}
