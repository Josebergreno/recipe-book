import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, windowWidth: number): unknown {
    let multiplier = windowWidth > 6.5 ? 20 : 10;
    let truncate = value.slice(0, windowWidth * multiplier);
    if (windowWidth < 3.5) {
      multiplier = 5;
    }
    return truncate.length !== value.length ? truncate + '...' : truncate;
  }
}
