import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              public dialogRef: MatDialogRef<AuthenticateComponent>) { }

  ngOnInit() {
  }

  showPass() {
    this.dialogRef.close(true);
  }
}
