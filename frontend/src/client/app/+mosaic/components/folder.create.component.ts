import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../shared/services/user.service";
import {MosaicService} from "../../shared/services/mosaic.service";
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {FoldersService} from "../../shared/services/folders.service";
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  selector: 'sd-folder-create',
  templateUrl: 'app/+mosaic/components/folder.create.component.html',
  directives: [ROUTER_DIRECTIVES],
})
export class FolderCreateComponent {
  name:string = '';
  images:any = '';
  errors:[any] = [];

  constructor(private user_service:UserService,
              private router:Router,
              private foldersService:FoldersService) {
  }

  ngOnInit() {
    if (!this.user_service.isLoggedIn()) {
      this.router.navigate(['./']);
    } else {

    }
  }

  create() {
    this.foldersService.createFolder({
        name: this.name,
      },
      this.images
    ).then(
      (success)=> {
        this.router.navigate(['./folders']);
      },
      (errors) => {
        this.errors = JSON.parse(errors);
      }
    )
  }

  selectImage(image) {
    this.images = image.files;
  }

}
