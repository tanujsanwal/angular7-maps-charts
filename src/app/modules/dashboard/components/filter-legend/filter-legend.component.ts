import { Component, OnInit, Input } from '@angular/core';
import { MarkerDataService } from 'src/app/modules/shared/services/marker-data.service';

@Component({
  selector: 'app-filter-legend',
  templateUrl: './filter-legend.component.html',
  styleUrls: ['./filter-legend.component.scss']
})
export class FilterLegendComponent implements OnInit {

  @Input('open') open: boolean;

  filters = this._markerDataService.filterLegends;

  constructor(
    private _markerDataService: MarkerDataService
  ) { }

  ngOnInit() {
  }

}
