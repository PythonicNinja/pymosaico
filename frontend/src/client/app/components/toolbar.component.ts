import { Component } from '@angular/core';
import {LogoutComponent} from "./logout.component";

@Component({
  selector: 'sd-toolbar',
  templateUrl: 'app/components/toolbar.component.html',
  styleUrls: ['app/components/toolbar.component.css'],
  directives: [LogoutComponent],
})
export class ToolbarComponent {}
