import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-asset-activity-list',
  templateUrl: './asset-activity-list.component.html',
  styleUrls: ['./asset-activity-list.component.scss']
})
export class AssetActivityListComponent implements OnInit {
@Input() dataSource;
  constructor() { }

  ngOnInit() {
  }

}
