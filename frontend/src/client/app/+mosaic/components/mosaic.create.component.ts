import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../shared/services/user.service";
import {MosaicService} from "../../shared/services/mosaic.service";
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {FoldersService} from "../../shared/services/folders.service";


@Component({
  selector: 'sd-mosaic-create',
  templateUrl: 'app/+mosaic/components/mosaic.create.component.html',
  styleUrls: ['app/+mosaic/components/mosaic.create.component.css'],
  directives: [],
})
export class MosaicCreateComponent {
  name:string = '';
  folder:string = '';
  folders:[any] = [];
  target:string = '';
  errors: [any] = [];
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
  create(){
    this.mosaicService.create({
      name: this.name,
      images_folder: this.folder
    }, {
      target: this.target
    }).then(
      (success)=>{
        this.router.navigate(['./mosaic']);
      },
      (errors) => {
        this.errors = JSON.parse(errors);
      }
    )
  }

  selectFolder(folder){
    this.folder = folder
  }

  selectImage(image){
    this.target = image.files[0];
  }

}
