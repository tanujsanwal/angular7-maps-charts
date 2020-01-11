import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/modules/shared/services/storage.service';
import { AjaxService } from 'src/app/modules/shared/services/ajax.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userInitials: string;
  userObject: any;
  townData;
  notifications = [
    {
      from: 'Town 1 updated',
      timestamp: new Date(),
      subject: 'Asset 1 -Published details to dashboard'
    },
    {
      from: 'Town 2 updated',
      timestamp: new Date(),
      subject: 'Asset 1 -Published details to dashboard'
    },
    {
      from: 'Town 3 updated',
      timestamp: new Date(),
      subject: 'Asset 1 -Published details to dashboard'
    }
  ];

  constructor(
    private _router: Router,
    private _storage: StorageService,
    private _ajax: AjaxService
  ) { }

  ngOnInit() {
    this.userObject = this._storage.getUser();
    if(this.userObject) {
      this.userInitials = (this.userObject.first_name?this.userObject.first_name[0]: '') + (this.userObject.last_name?this.userObject.last_name[0]: '');
      this._ajax.getTotalTownList().subscribe((res:any) => {
        console.log(res);
        this.townData = res[0].id;
      });
    }
    
  }

  logout(ev) {
    this._ajax.logout().subscribe((res) => {
      this._storage.delToken();
      this._storage.delUser();
      this._router.navigateByUrl('/auth');
    }, (err) => {
      this._storage.delToken();
      this._storage.delUser();
      this._router.navigateByUrl('/auth');
    });
  }

}
