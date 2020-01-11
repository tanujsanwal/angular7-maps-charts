import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-town-map',
  templateUrl: './town-map.component.html',
  styleUrls: ['./town-map.component.scss']
})
export class TownMapComponent implements OnInit {
  @Input('data') data;
  lat: number ;
  lng: number ;
 
  constructor() { }

  ngOnInit() {
  this.lat = parseInt(this.data.latitude);
  this.lng = parseInt(this.data.longitude);
  }

}
