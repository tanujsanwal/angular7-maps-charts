import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconUrl'
})
export class IconUrlPipe implements PipeTransform {

  transform(value: any, hover?: any, status?: any, selected?: any): any {
    // console.log(value, hover, status);
    if(selected) {
      return '/assets/svgs/indicators/selected.svg';
    }
    if(!value) {
      if(hover) {
        return '/assets/svgs/indicators/town_hover.svg';
      }
      return '/assets/svgs/indicators/town.svg';
    } else {
      if(value.name === 'naalas') {
        if(hover) {
          return '/assets/svgs/indicators/'+status.toLowerCase()+'_hover.svg';
        }
        return '/assets/svgs/indicators/'+status.toLowerCase()+'.svg';
      }
      if(value.name === 'treatment_plants') {
        if(hover) {
          return '/assets/svgs/indicators/treatment_' + status.toLowerCase() + '_hover.svg';
        } 
        return '/assets/svgs/indicators/treatment_' + status.toLowerCase() + '.svg';
      }

      if(value.name === 'pumping_station') {
        if(hover) {
          return '/assets/svgs/indicators/'+value.name+'_hover.svg';
        }
        return '/assets/svgs/indicators/'+value.name+'.svg';
      }
    }

    // default case
    if(hover) {
      return '/assets/svgs/marker_hover.svg';
    } 
    return '/assets/svgs/marker.svg';
  }

}
