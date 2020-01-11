import { Component, OnInit } from '@angular/core';
import { AjaxService } from 'src/app/modules/shared/services/ajax.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddAssetComponent } from '../models/add-asset/add-asset.component';
import { AddGeneralDetailComponent } from '../models/add-general-detail/add-general-detail.component';
import { HideUnhideTownComponent } from '../models/hide-unhide-town/hide-unhide-town.component';
import { StorageService } from 'src/app/modules/shared/services/storage.service';

@Component({
  selector: 'app-town-details',
  templateUrl: './town-details.component.html',
  styleUrls: ['./town-details.component.scss']
})
export class TownDetailsComponent implements OnInit {

  data;
  // role;
  dataSource;
  userObject;
  noData:boolean = true;
  showLoader:boolean = true;
  constructor(public dialog: MatDialog,
              private _ajax: AjaxService,
              private _route: ActivatedRoute,
              private _storage: StorageService) { }

  ngOnInit() {
    // this.role = this._storage.getRole();
    this.userObject = this._storage.getUser();
    this._ajax.getTownDetail(this._route.snapshot.params.townId).subscribe((res:any) => {
      this.data = res;
      console.log(this.data);
      this.showLoader = false;
      if(this.data.houses != 0 || this.data.population != 0) {
        this.noData = false;
      }
    });

  }

  addTownAsset(data) {
    const dialogRef = this.dialog.open(AddAssetComponent, {
      width: '800px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result) {
        this._ajax.getTownAsset(this._route.snapshot.params.townId).subscribe((res:any) => {
          console.log(res);
          this.dataSource = res;
        });
      }
    });
  }

  addGeneralDetail(value) {
    let editData ;
    // if(value = 'edit') {
      editData = {
        data : this.data,
        click: value
      }
    // }
    const dialogRef = this.dialog.open(AddGeneralDetailComponent, {
      width: '400px',
      data: editData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result) {
        this.noData = false;
        this.data = result;
      }
    });
  }
  hideTown() {
    const dialogRef = this.dialog.open(HideUnhideTownComponent, {
      width: '460px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
