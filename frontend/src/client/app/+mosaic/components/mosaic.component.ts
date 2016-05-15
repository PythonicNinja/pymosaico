import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';
import {UserService} from "../../shared/services/user.service";
import {MosaicService} from "../../shared/services/mosaic.service";
import {MosaicCreateComponent} from "./mosaic.create.component";

@Component({
  selector: 'sd-mosaic',
  templateUrl: 'app/+mosaic/components/mosaic.component.html',
  styleUrls: ['app/+mosaic/components/mosaic.component.css']
})
export class MosaicComponent {
  mosaics = [];
  constructor(private user_service:UserService,
              private router: Router,
              private mosaicService: MosaicService) {}

  ngOnInit() {
      if(!this.user_service.isLoggedIn()){
        this.router.navigate(['./']);
      }else{
        this.mosaicService.get_mosaics().subscribe(
          data => {
            this.mosaics = data;
          },
          err => {
            console.log(err);
          },
          () => {
          }
        );

      }
  }
}
