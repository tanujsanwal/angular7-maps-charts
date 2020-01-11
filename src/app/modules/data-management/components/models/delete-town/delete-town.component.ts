import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../../../node_modules/@angular/material';

@Component({
  selector: 'app-delete-town',
  templateUrl: './delete-town.component.html',
  styleUrls: ['./delete-town.component.scss']
})
export class DeleteTownComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public dialogRef: MatDialogRef<DeleteTownComponent>) { }

  ngOnInit() {
  }

  deleteTown() {
    this.dialogRef.close(true);
  }
}
