import { ROUTER_DIRECTIVES, Router} from '@angular/router';
import { UserService } from "../../shared/services/user.service";
import { Component } from '@angular/core';
import { FoldersService } from "../../shared/services/folders.service";

@Component({
  selector: 'sd-folders',
  templateUrl: 'app/+mosaic/components/folders.component.html',
  directives: [ROUTER_DIRECTIVES],
})
export class FoldersComponent {
  folder:string = '';
  folders:[any] = [];

  constructor(private user_service:UserService,
              private router: Router,
              private foldersService: FoldersService) {

  }

  ngOnInit() {
      if(!this.user_service.isLoggedIn()){
        this.router.navigate(['/']);
      }else{
        this.foldersService.get_folders().subscribe(
          (folders) => {
            this.folders  = folders;
          }
        )
      }
  }

}
