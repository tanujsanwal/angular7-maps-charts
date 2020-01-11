import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MarkerDataService } from '../../../shared/services/marker-data.service';
import { AjaxService } from 'src/app/modules/shared/services/ajax.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  @ViewChild('markerDetails') marker: MatSidenav;
  markerData: any;
  options = {
    lat: 30.24125569693039,
    lng: 78.82755888510572,
    zoom: 8
  };
  areas = [];
  resize: boolean = false;
  showLoader: boolean = true;

  constructor(
    private sidebar: MarkerDataService,
    private _ajax: AjaxService
  ) { }

  ngOnInit() {
    this._ajax.getAreaPolygons().subscribe((res: Array<any>) => {
      this.areas = res;
    });
  }

  markerClick(ev) {
    this.showLoader = true;
    if(ev == 'close') {
      this.marker.close();
    } else {
      console.log(ev, this.showLoader);
      this.markerData = ev;
      this.marker.open();
      this.updatePosition(ev);
      setTimeout(() => {
        this.showLoader = false;
      },900);
     
    }
  }

  updatePosition(ev) {
    if(ev.project) {
      console.log('show_'+ev.project.name, ev);
      this.sidebar.filterLegends.get('show_'+ev.project.name).setValue(true, {emitEvent: true});
    }
    this.options.lat = Number(ev.latitude);
    this.options.lng = Number(ev.longitude);
    this.setZoomLevel(ev);
  }

  setZoomLevel(marker) {
    let idx = this.areas.findIndex((item) => {
      return item.name.toLowerCase() === marker.name.toLowerCase();
    });

    if(idx > -1) {
      let GLOBE_WIDTH = 256;
      let directions = this.getDirections(this.areas[idx]);
      let angle = directions.east - directions.west;
      if (angle < 0) {
          angle += 360;
      }
      let angle2 = directions.north - directions.south;
      if (angle2 > angle) angle = angle2;
      let zoomfactor = Math.floor(Math.log(960 * 360 / angle / GLOBE_WIDTH) / Math.LN2)-1;
      console.log(zoomfactor);
      this.options.zoom = zoomfactor;
    } else {
      this.options.zoom = 35;
    }

    console.log(this.options);
  }

  getDirections(area) {
    let sortedLat = [], sortedLong = [];
    area.polygonPath.forEach((item) => {
      sortedLat.push(item.lat);
      sortedLong.push(item.lng);
    });

    sortedLat = sortedLat.sort();
    sortedLong = sortedLong.sort();

    return {
      north: sortedLat.pop(),
      south: sortedLat.shift(),
      east: sortedLong.pop(),
      west: sortedLong.shift()
    }
  }

  resetZoom() {
    this.options = {
      lat: 30.24125569693039,
      lng: 78.82755888510572,
      zoom: 8
    }
  }

}
