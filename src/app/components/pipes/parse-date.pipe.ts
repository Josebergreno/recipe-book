import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseDate',
})
export class ParseDatePipe implements PipeTransform {
  transform(value: Date): unknown {
    let hours = new Date(value).getHours();
    const convertHours = hours > 12 ? (hours -= 12) : hours;
    let minutes = new Date(value).getMinutes();

    const AMOrPM = hours > 12 ? 'A.M' : 'P.M';
    const day = new Date(value).getDay();
    const date = new Date(value).getDate();
    const month = new Date(value).getMonth();
    const weekDays = [
      'Sun.',
      'Mon.',
      'Tues.',
      'Wed.',
      'Thurs.',
      'Fri.',
      'Sat.',
    ];
    const months = [
      'Jan.',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug.',
      'Sept.',
      'Oct.',
      'Nov.',
      'Dec.',
    ];
    let minutesString = minutes.toString();
    if (minutes < 10) {
      minutesString = '0' + minutes;
    }
    const dateFormat =
      weekDays[day] +
      ' ' +
      months[month] +
      ' ' +
      date +
      ' at ' +
      convertHours +
      ':' +
      minutesString +
      ' ' +
      AMOrPM;

    return dateFormat;
  }
}
