import { Component, OnInit } from '@angular/core';
import { AjaxService } from 'src/app/modules/shared/services/ajax.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements OnInit {

  displayedColumns: string[] = ['message', 'created_at'];
  dataSource:any;
  constructor(private _ajax: AjaxService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._ajax.getAssetLogs(this._route.snapshot.params.townId).subscribe((res:any) => {
      console.log(res);
      this.dataSource = res.results;
    });
  }

}
