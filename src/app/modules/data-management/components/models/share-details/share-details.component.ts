import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-share-details',
  templateUrl: './share-details.component.html',
  styleUrls: ['./share-details.component.scss']
})
export class ShareDetailsComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
    console.log(this.data);
  }

}
