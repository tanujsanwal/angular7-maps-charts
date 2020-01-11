import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';
import { AgmMarkerCluster } from '@agm/js-marker-clusterer';

import { of, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { AjaxService } from 'src/app/modules/shared/services/ajax.service';
import { MarkerDataService } from 'src/app/modules/shared/services/marker-data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

    @Input('options') options;
    @Input('resize') resize: boolean;
    @Input('areas') areas: number;
    @Output() markerClicked = new EventEmitter();
    @Output() zoomChanged = new EventEmitter();

    @ViewChild('mapObj') mapObj: AgmMap;
    @ViewChild('clusterer') clusterer: AgmMarkerCluster;

    streetViewControl: boolean = false;
    @Input() selectedMarker: any;
    iconUrl: string = '/assets/svgs/marker.svg';

    updatedOptions = {
        lat: 0,
        lng: 0,
        zoom: 0,
        change: false
    }

    polygonOptions = {
        strokeColor: '#002D72',
        strokeWeight: 2,
        fillOpacity: 0,
        strokeOpacity: 1,
        labelColor: '#003F5C'
    }

    clusterOptions = {
        imageExtension: 'svg',
        imagePath: 'assets/svgs/map',
        gridSize: 60,
        averageCenter: true,
        styles: [{
            textColor: "#FFFFFF",
            url: "assets/svgs/indicators/group.svg",
            height: 40,
            width: 40
        },
        {
            textColor: "#FFFFFF",
            url: "assets/svgs/indicators/group.svg",
            height: 40,
            width: 40
        }]
    };

    markers = [];
    dataMarkers = [];
    zoomOptions = {
        min: 8,
        max: 19
    };
    zoomChange = new Subject<any>();

    mapStyles = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#b6b6b6"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#bdbdbd"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "road",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dadada"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#c9c9c9"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#5aafe0"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        }
    ];

    constructor(
        private _ajax: AjaxService,
        private _markerDataService: MarkerDataService
    ) { }

    ngOnInit() {
        if(!this.selectedMarker) {
            this.selectedMarker = {};
        }
        this._ajax.getAssetNavigator().subscribe((res: any) => {
            this.dataMarkers = res;
            this.markers = [];
            this.buildMarkersArray(res, 0);
            console.log(this.markers);
        });

        this._markerDataService.filterLegends.valueChanges.subscribe((res) => {
            this.markers = [];
            this.buildMarkersArray(this.dataMarkers, 0);
        });

        this.zoomChange.pipe(
            debounceTime(300),
            switchMap((obs) => {
                return of(obs);
            })
        ).subscribe((res:any) => {
            console.log(res);
            if(isNaN(res)) {
                this.options.lat = res.lat;
                this.options.lng = res.lng;
            } else {
                this.options.zoom = res;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        if(changes.options && !changes.options.firstChange) {
            this.selectedMarker = {};
        }
    }

    buildMarkersArray(array, level, type=null) {
        // console.log('level', level);
        if(array && array.length > 0) {
            array.forEach((item, idx) => {
                if(level === 0) {
                    item.type = 'town';
                    if(item.latitude && item.longitude) {
                        item.latitude = Number(item.latitude);
                        item.longitude = Number(item.longitude);
                        this.markers.push(item);
                    }
                } else if(level === 1) {
                    // console.log(this._markerDataService.filterLegends.value);
                    if(item.name === 'treatment_plants' && (this._markerDataService.filterLegends.value.show_treatment_plants || this._markerDataService.filterLegends.value.treatment_plant.indeterminate)) {
                        return this.buildMarkersArray(item.children, level+1, item.name);
                    } else if(item.name === 'naalas' && (this._markerDataService.filterLegends.value.show_naalas || this._markerDataService.filterLegends.value.naalas.indeterminate)) {
                        return this.buildMarkersArray(item.children, level+1, item.name);
                    } else if(item.name === 'pumping_station') {
                        return this.buildMarkersArray(item.children, level+1, item.name);
                    } else {
                        return this.buildMarkersArray(null, -1);
                    }
                } else if(level === 2) {
                    item.type = type;

                    //Treatment Plant
                    if(item.extras.status === 'Operational' && this._markerDataService.filterLegends.value.treatment_plant.operational) {
                        item.latitude = Number(item.latitude);
                        item.longitude = Number(item.longitude);
                        item.iconUrl = './assets/'
                        this.markers.push(item);
                    }
                    if(item.extras.status === 'Proposed' && this._markerDataService.filterLegends.value.treatment_plant.proposed) {
                        item.latitude = Number(item.latitude);
                        item.longitude = Number(item.longitude);
                        this.markers.push(item);
                    }

                    //Naalas
                    if(item.extras.status === 'Tapped' && this._markerDataService.filterLegends.value.naalas.tapped) {
                        item.latitude = Number(item.latitude);
                        item.longitude = Number(item.longitude);
                        this.markers.push(item);
                    }
                    if(item.extras.status === 'Partially Tapped' && this._markerDataService.filterLegends.value.naalas.partially_tapped) {
                        item.latitude = Number(item.latitude);
                        item.longitude = Number(item.longitude);
                        this.markers.push(item);
                    }
                    if(item.extras.status === 'Untapped' && this._markerDataService.filterLegends.value.naalas.untapped) {
                        item.latitude = Number(item.latitude);
                        item.longitude = Number(item.longitude);
                        this.markers.push(item);
                    }

                    // pumping stations
                    if(type === 'pumping_station') {
                        if(this._markerDataService.filterLegends.value.show_pumping_station) {
                            item.latitude = Number(item.latitude);
                            item.longitude = Number(item.longitude);
                            this.markers.push(item);
                        }
                    }
                }
                
                if(item.children && item.children.length > 0) {
                    return this.buildMarkersArray(item.children, level+1);
                } else {
                    return this.buildMarkersArray(null, -1);
                }
            })
        }
        return;
    }

    markerClick(marker) {
        this.markerClicked.emit(marker);
        console.log(this.selectedMarker);
    }

    mapClicked(ev) {
        console.log('map clicked', ev);
        this.selectedMarker = {};
        this.markerClicked.emit('close');
    }

    mapTypeChange(ev) {
        console.log(ev);
        if(ev == 'hybrid' || ev == 'satellite') {
            this.polygonOptions.strokeColor = '#FFFFFF';
            this.polygonOptions.labelColor = '#FFFFFF';
            // this.polygonOptions.strokeOpacity = 1;
        } else {
            this.polygonOptions.strokeColor = '#002D72';
            this.polygonOptions.labelColor = '#003F5C';
            // this.polygonOptions.strokeOpacity = 1;
        }
    }

    toggle(marker, ev) {
        if(ev) {
            marker.hover = true;
            marker.iconUrl = '/assets/svgs/marker_hover.svg';
        } else {
            marker.hover = false;
            marker.iconUrl = '/assets/svgs/marker.svg';
        }
    }
}
