import { Injectable, Output, EventEmitter  } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MarkerDataService {

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  filterLegends = this._fb.group({
    show_treatment_plants: [true],
    treatment_plant: this._fb.group({
      operational: [true],
      proposed: [true]
    }),
    show_naalas: [true],
    naalas: this._fb.group({
      tapped: [true],
      partially_tapped: [true],
      untapped: [true]
    }),
    show_pumping_station: [true],
    pumping_station: this._fb.group({
      operational: [true],
      proposed: [true]
    })
  });

  constructor(
    private _fb: FormBuilder
  ) {
    this.initLegends();
  }

  sideBarData(data) {
    console.log(data);
    this.change.emit(data);
  }

  initLegends() {

    // Treatment plant
    this.filterLegends.get('show_treatment_plants').valueChanges.subscribe((res) => {
      console.log('before treatmentplant', this.filterLegends.value, res);
      if(!res) {
        this.filterLegends.get('treatment_plant').get('operational').setValue(false, {onlySelf: true, emitEvent: false});
        this.filterLegends.get('treatment_plant').get('proposed').setValue(false);
      } else if(res) {
        this.filterLegends.get('treatment_plant').get('operational').setValue(true, {onlySelf: true, emitEvent: false});
        this.filterLegends.get('treatment_plant').get('proposed').setValue(true);
      }
      console.log('after treatmentplant', this.filterLegends.value, res);
    });

    this.filterLegends.get('treatment_plant').valueChanges.subscribe((res) => {
      console.log('tt before', res);
      if(res.operational || res.proposed) {
        this.filterLegends.get('show_treatment_plants').setValue(true, {onlySelf: true, emitEvent: false});
      } else {
        this.filterLegends.get('show_treatment_plants').setValue(false, {onlySelf: true, emitEvent: false});
      }
      console.log('tt after', res);
    });

    // Naalas
    this.filterLegends.get('show_naalas').valueChanges.subscribe((res) => {
      console.log('before naalas', this.filterLegends.value, res);
      if(!res) {
        this.filterLegends.get('naalas').get('tapped').setValue(false, {onlySelf: true, emitEvent: false});
        this.filterLegends.get('naalas').get('partially_tapped').setValue(false, {onlySelf: true, emitEvent: false});
        this.filterLegends.get('naalas').get('untapped').setValue(false);
      } else if(res) {
        this.filterLegends.get('naalas').get('tapped').setValue(true, {onlySelf: true, emitEvent: false});
        this.filterLegends.get('naalas').get('partially_tapped').setValue(true, {onlySelf: true, emitEvent: false});
        this.filterLegends.get('naalas').get('untapped').setValue(true);
      }
      console.log('after naalas', this.filterLegends.value, res);
    });

    this.filterLegends.get('naalas').valueChanges.subscribe((res) => {
        console.log('nl before', res);
        if(res.tapped || res.untapped || res.partially_tapped) {
          this.filterLegends.get('show_naalas').setValue(true, {onlySelf: true, emitEvent: false});
        } else {
          this.filterLegends.get('show_naalas').setValue(false, {onlySelf: true, emitEvent: false});
        }
        console.log('nl after', res);
    });

    // Pumping station
    this.filterLegends.get('show_pumping_station').valueChanges.subscribe((res) => {
      console.log('before pumping station', this.filterLegends.value, res);
      if(!res) {
        this.filterLegends.get('pumping_station').get('operational').setValue(false, {onlySelf: true, emitEvent: false});
        this.filterLegends.get('pumping_station').get('proposed').setValue(false);
      } else if(res) {
        this.filterLegends.get('pumping_station').get('operational').setValue(true, {onlySelf: true, emitEvent: false});
        this.filterLegends.get('pumping_station').get('proposed').setValue(true);
      }
      console.log('after pumping station', this.filterLegends.value, res);
    });

    this.filterLegends.get('pumping_station').valueChanges.subscribe((res) => {
      console.log('tt before', res);
      if(res.operational || res.proposed) {
        this.filterLegends.get('show_pumping_station').setValue(true, {onlySelf: true, emitEvent: false});
      } else {
        this.filterLegends.get('show_pumping_station').setValue(false, {onlySelf: true, emitEvent: false});
      }
      console.log('ps after', res);
    });
  }
}
