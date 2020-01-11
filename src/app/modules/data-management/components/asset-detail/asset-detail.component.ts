import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { AjaxService } from 'src/app/modules/shared/services/ajax.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss']
})
export class AssetDetailComponent implements OnInit {
  
  data;
  userObject;
  townDetailData;
  showLoader:boolean = true;
  geoLocation:boolean = false;
  photos:boolean = false;
  nallahMeetGanga:boolean = false;
  townId = this._route.snapshot.params.townId;
  taskId = this._route.snapshot.params.assetId;
  constructor(public dialog: MatDialog,
              private _ajax: AjaxService,
              private _route: ActivatedRoute,
              private _storage: StorageService,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.userObject = this._storage.getUser();
    this._ajax.getAsset(this.townId,this.taskId).subscribe((res:any) => {
      this.data = res;
      console.log(this.data);
      if(this.data.latitude != "0.000000" && this.data.longitude != "0.000000") {
        this.geoLocation = true;
      }
      if(this.data.images.length > 0) {
        this.photos = true;
      }
      this._ajax.getTownDetail(this.townId).subscribe((res:any) => {
        this.townDetailData = res;
        console.log(this.townDetailData);
        this.showLoader = false;
      });
      
    });

  
   
  }

  publishToDashboard() {
    let data = {
      is_published : true
    }
    this._ajax.addTownDetails(data,this.townId).subscribe((res) => {
      console.log(res);
      this._snackBar.open("Published to dashboard", "ok", {
        duration: 2000,
      });
    });
  }

  request(text) {

    this._snackBar.open(text, "ok", {
      duration: 2000,
    });
  }

}
