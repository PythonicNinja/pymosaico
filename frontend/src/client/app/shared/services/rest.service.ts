import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from "rxjs/Observable";


@Injectable()
export class RestService {
  public url:string;

  constructor(private http: Http
  ) {
    this.url =  'http://127.0.0.1:8000/';
  }

  token(): string {
    return 'Token ' + localStorage.getItem('auth_token');
  }

  getBaseUrl(): string{
    return this.url;
  }

  postFiles(url:string, method:string, data:any, files:any):Promise {
    return new Promise((resolve, reject) => {

      let xhr:XMLHttpRequest = new XMLHttpRequest();
      xhr.open(method, this.getBaseUrl() + url, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('Authorization',  this.token());
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      let formData = new FormData();
      for(var file in files)
        formData.append(file, files[file], files[file].name);
      for(var value in data)
        formData.append(value, data[value]);

      xhr.send(formData);
    });
  }

  get(url):Observable {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.token());

    return this.http
      .get(
        this.getBaseUrl() + url,
        {headers:headers}
      )
      .map(res => res.json())
  }

}

