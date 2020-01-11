import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { AjaxService } from 'src/app/modules/shared/services/ajax.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-general-detail',
  templateUrl: './add-general-detail.component.html',
  styleUrls: ['./add-general-detail.component.scss']
})
export class AddGeneralDetailComponent implements OnInit {
  generalDetials = this.fb.group ({
    houses: [''],
    population: [''],
    extras: this.fb.group({
      connected_households: [''],
      remaining_households: ['']
    })
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private fb: FormBuilder,
              private _ajax: AjaxService,
              private _route: ActivatedRoute,
              public dialogRef: MatDialogRef<AddGeneralDetailComponent>,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.data);
    if(this.data.click == 'edit') {
      this.generalDetials.patchValue({
        houses: this.data.data.houses,
        population: this.data.data.population,
        extras: {
          connected_households: this.data.data.extras.connected_households,
          remaining_households: this.data.data.extras.remaining_households
        }
      })
    }
   
  }
  addGeneralDetails() {
    console.log(this.generalDetials);
    this._ajax.addTownDetails(this.generalDetials.value,this.data.data.id).subscribe((res) => {
      console.log(res);
      this.dialogRef.close(res);
      this._snackBar.open("General detail is added", "ok", {
        duration: 2000,
      });
    });
  }

}
