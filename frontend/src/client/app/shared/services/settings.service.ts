import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class SettingsService {
  public url:string = 'http://127.0.0.1:8000/';

  constructor(private http: Http) {}

  getUrl(): string{
    return this.url;
  }
}

