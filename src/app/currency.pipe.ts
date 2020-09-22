import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
  defaultLength: number = 15;
  transform(value: string, ...args: unknown[]): string {
    const amountStr = parseFloat(value).toFixed(2).toString();
    return "₹ " + amountStr;
  }

}
