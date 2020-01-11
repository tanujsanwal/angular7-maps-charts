import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { AjaxService } from 'src/app/modules/shared/services/ajax.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-town',
  templateUrl: './add-town.component.html',
  styleUrls: ['./add-town.component.scss']
})
export class AddTownComponent implements OnInit {

  addTown = this.fb.group ({
    name: [''],
    user: this.fb.group ({
      email: [''],
      password: ['']
    }),
    jal_nigam: this.fb.group ({
      email: [''],
      password: ['']
    }),
    jal_sansthan: this.fb.group ({
      email: [''],
      password: ['']
    })


  });
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private _ajax: AjaxService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddTownComponent>,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.data);
  }

  addTowns() {
    console.log(this.addTown.value);
    this._ajax.addTown(this.addTown.value).subscribe((res) => {
    console.log(res);
    this.dialogRef.close(res);
    this._snackBar.open("Town is added", "", {
      duration: 2000,
    });
    });
  }
}
