import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../shared/services/user.service";
import {MosaicService} from "../../shared/services/mosaic.service";

@Component({
  selector: 'sd-mosaic-create',
  templateUrl: 'app/+mosaic/components/mosaic.create.component.html',
  styleUrls: ['app/+mosaic/components/mosaic.create.component.css']
})
export class MosaicCreateComponent {
  name:string = '';
  folder:string = '';
  folders:[any] = [];
  target:string = '';
  errors: [any] = [];
  constructor(private user_service:UserService,
              private router: Router,
              private mosaicService: MosaicService) {}

  ngOnInit() {
      if(!this.user_service.isLoggedIn()){
        this.router.navigate(['./']);
      }else{

      }
  }
}
