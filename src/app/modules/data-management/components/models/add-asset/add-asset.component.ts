import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { AjaxService } from 'src/app/modules/shared/services/ajax.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit {

  typeOfAsset = [
    'Treatment plant',
    'Naala',
    'Pumping station'
  ]

  addAsset = this.fb.group ({
    name: [''],
    project: this.fb.group ({
      name: ['treatment_plants']
    }),
    status: [0],
    extras: this.fb.group ({
      intake: [],
      capacity: [],
      proposed_status: [],
      other_proposed_status: [''],
      status: ['Proposed'],
      technology: [''],
      other_technology: [''],
      treatment_plant_name: [''],
      treatment_plant_type: [''],
      drain: [''],
      survey: [''],
      reason: [''],
      flow: [''],
      operated_by: [''],
      name: ['']
    })
    
  });
  // selectedAsset = 'Treatment plant';
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private fb: FormBuilder,
  private _ajax: AjaxService,
  private _route: ActivatedRoute,
  public dialogRef: MatDialogRef<AddAssetComponent>,
  private _snackBar: MatSnackBar) { }

  ngOnInit() {
    // this.selectedAsset = this.typeOfAsset[0];
  }

  addAssetDetail() {
    console.log(this.addAsset);
    this._ajax.addAsset(this.addAsset.value,this.data.id).subscribe((res) => {
      console.log(res);
      this.dialogRef.close(res);
      this._snackBar.open("Asset detail is added", "", {
        duration: 2000,
      });
    });
  }
}
