import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noStock'
})
export class NoStockPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == null || value == undefined) {
      return "0";
    } else {
      return value;
    }
  }

}
