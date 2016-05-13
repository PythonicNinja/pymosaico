import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {RestService} from "./rest.service";

@Injectable()
export class UserService {
  public loggedIn = false;

  public userChanged: EventEmitter = new EventEmitter();
  userChanged: Observable<boolean>;
  private _observer: Observer<boolean>;

  constructor(private http: Http, private restService:RestService) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    this.userChanged = new Observable(observer => this._observer = observer).share();
  }

  login(username:string, password:string): Observable {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(
        this.restService.getBaseUrl() + 'rest-auth/login/',
        JSON.stringify({ username, password }),
        { headers }
      )
      .map(res => res.json())
  }

  register(username:string, password1:string, password2:string): Observable {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(
        this.restService.getBaseUrl() + 'rest-auth/registration/',
        JSON.stringify({ username:username, password1:password1, password2:password2}),
        { headers }
      )
      .map(res => res.json())
  }

  setToken(token:string): void {
    localStorage.setItem('auth_token', token);
    this._observer.next(true);
    this.loggedIn = true;
  }

  token(): string {
    return 'Token ' + localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this._observer.next(false);
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('auth_token');
  }
}
