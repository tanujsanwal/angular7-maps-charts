import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitString'
})
export class SplitStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value && args) {
      return value.split(args).join(' ');
    }
    return null;
  }

}
