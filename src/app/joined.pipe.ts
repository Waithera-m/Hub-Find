import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joined'
})
export class JoinedPipe implements PipeTransform {
  
  transform(value: any): any {
    if(value){
      const seconds = Math.floor((+new Date() - + new Date(value))*0.001)
      const times = {
        'year': 31449600,
        'month': 2419200,
        'week': 604800,
        'day': 86400,
        'hour': 3600,
        'minute': 60
      };
      let counter;
      for(const i in times){
        counter = Math.floor(seconds/times[i]);
        if(counter > 0)
        if(counter === 1){
          return counter + " " + i + ' ago';
        }else {
          return counter + " " + i + "s ago";
        }
      }
    }
    return value
  }

}
