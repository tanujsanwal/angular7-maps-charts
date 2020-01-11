import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AjaxService } from 'src/app/modules/shared/services/ajax.service';

@Component({
  selector: 'app-hide-unhide-town',
  templateUrl: './hide-unhide-town.component.html',
  styleUrls: ['./hide-unhide-town.component.scss']
})
export class HideUnhideTownComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
   public dialogRef: MatDialogRef<HideUnhideTownComponent>,
   private _ajax: AjaxService) { }

  ngOnInit() {
  console.log(this.data.name);
  }

  toggleHideTown() {
    this.data.show_in_dashboard = !this.data.show_in_dashboard;
    this._ajax.addTownDetails(this.data,this.data.id).subscribe((res) => {
      console.log(res);
    });
    this.dialogRef.close();
  }
}
