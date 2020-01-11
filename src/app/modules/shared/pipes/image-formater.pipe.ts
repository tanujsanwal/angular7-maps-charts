import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageFormater'
})
export class ImageFormaterPipe implements PipeTransform {

  transform(value: any): any {
    console.log(value.length);
    let imageObj = [];
    

    for (let i =0; i<value.length;i++) {
      let obj = {
        image : value[i],
        thumbImage: value[i]
      };
      imageObj.push(obj);
    }
    
    return imageObj;
  }

}
