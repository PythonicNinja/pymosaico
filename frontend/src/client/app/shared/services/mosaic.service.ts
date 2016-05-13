import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";
import {SettingsService} from "./settings.service";

@Injectable()
export class MosaicService {
  constructor(private http:Http, private userService:UserService, private settingsService:SettingsService) {

  }

  get_mosaics():Observable {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(this.userService.token());
    headers.append('Authorization', this.userService.token());

    return this.http
      .get(
        this.settingsService.getUrl() + 'mosaico/viewset/',
        {headers:headers}
      )
      .map(res => res.json())
  }


  create(data:any, files:any):Promise {
    return new Promise((resolve, reject) => {

      let xhr:XMLHttpRequest = new XMLHttpRequest();
      xhr.open('POST', this.settingsService.getUrl() + 'mosaico/viewset/', true);

      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('Authorization',  this.userService.token());
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
}


export function isLoggedIn() {
  return !!localStorage.getItem('auth_token');
}
