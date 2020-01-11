import { Component, OnInit, Input } from '@angular/core';
import { AjaxService } from 'src/app/modules/shared/services/ajax.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'kmlUpload', 'userid', 'updated_at','status'];
  @Input() dataSource;
  // dataSource:any;
  townId = this._route.snapshot.params.townId;
  constructor(private _ajax: AjaxService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._ajax.getTownAsset(this.townId).subscribe((res:any) => {
      console.log(res);
      this.dataSource = res;
    });
    
  }

}
