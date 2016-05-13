import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../shared/services/user.service";
import {MosaicService} from "../../shared/services/mosaic.service";
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {FoldersService} from "../../shared/services/folders.service";


@Component({
  selector: 'sd-folders',
  templateUrl: ['app/+mosaic/components/folders.component.html'],
  directives: [],
})
export class FoldersComponent {
  folder:string = '';
  folders:[any] = [];
  constructor(private user_service:UserService,
              private router: Router,
              private mosaicService: MosaicService,
              private foldersService: FoldersService) {}

  ngOnInit() {
      if(!this.user_service.isLoggedIn()){
        this.router.navigate(['./']);
      }else{
        this.foldersService.get_folders().subscribe(
          (folders) => {
            this.folders  = folders
          }
        )
      }
  }


  selectFolder(folder){
    console.log(folder);
    this.folder = folder
  }

}