import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatTable, MatSnackBar } from '@angular/material';
import { AddTownComponent } from '../models/add-town/add-town.component';
import { Router } from '@angular/router';
import { AjaxService } from 'src/app/modules/shared/services/ajax.service';
import { ShareDetailsComponent } from '../models/share-details/share-details.component';
import { AuthenticateComponent } from '../models/authenticate/authenticate.component';
import { StorageService } from '../../../shared/services/storage.service';
import { DeleteTownComponent } from '../models/delete-town/delete-town.component';

@Component({
  selector: 'app-towns-list',
  templateUrl: './towns-list.component.html',
  styleUrls: ['./towns-list.component.scss']
})
export class TownsListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'kmlUpload', 'userid', 'password', 'jaluserid', 'jalpassword', 'updated_at','delete'];
  dataSource:any;
  totalTown:number;
  userObject;
  showPassword:boolean = false;

  constructor(public dialog: MatDialog,
    private _router: Router,
    private _ajax: AjaxService,
    private _storage: StorageService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userObject = this._storage.getUser();
    this._ajax.getTotalTownList().subscribe((res:any) => {
      console.log(res);
      this.dataSource = res;
      this.totalTown = res.length;
    });

    
  }

  showPass() {

    this.showPassword = true;
    
    // const dialogRef = this.dialog.open(AuthenticateComponent, {
    //   width: '500px'
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed',result);
    //   if(result) {
    //     this.showPassword = true;
    //   }
    // });

   
  }

  addTown() {
    const dialogRef = this.dialog.open(AddTownComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result) {
        let newData = this.dataSource ;
        newData.push(result);
        this.dataSource = [...newData];
        this.totalTown = this.totalTown+1;
        console.log(this.dataSource);
        
      }
    });
  }

  shareTown(element) {
    const dialogRef = this.dialog.open(ShareDetailsComponent, {
      width: '500px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // editTown(): void {
  //   const dialogRef = this.dialog.open(ShareDetailsComponent, {
  //     width: '500px'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

  deleteTown(value,i) {
    const dialogRef = this.dialog.open(DeleteTownComponent, {
      width: '300px',
      data: value
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result) {
        this._ajax.deleteTownDetails(value.id).subscribe((res:any) => {
          console.log(res);
          let data = this.dataSource;
          data.splice(i,1);
          this.dataSource = [...data];
          this.totalTown = this.totalTown-1;
          this._snackBar.open("Town is deleted", "ok", {
            duration: 2000,
          });
        });
      }
    });

   
  }

  showTownDetail(element) {
    this._router.navigateByUrl('/data-management/town/'+element.id);
  }

}
