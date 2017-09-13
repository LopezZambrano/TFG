import { Pipe } from '@angular/core';

@Pipe({
  name: "orderBy"
})
export class OrderByPipe {
  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if (a < b) {
          console.log('hola')
        return -1;
      } else if (a > b) {
          console.log('como')
        return 1;
      } else {
          console.log('estas')
        return 0;
      }
    });
    return array;
  }
}