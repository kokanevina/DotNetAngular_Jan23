import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefix'
})
export class PrefixPipe implements PipeTransform{
  transform(value: string, ...args: string[]):string {
 
    return args[0]+"-"+value;
    
  }
}
