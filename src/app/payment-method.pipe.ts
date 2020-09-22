import { Pipe, PipeTransform } from '@angular/core';
import { PaymentMethod } from './payment-method.enum';

@Pipe({
  name: 'paymentMethod'
})
export class PaymentMethodPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    switch(value)
    {
      case PaymentMethod.CARD:
        return "CARD";
      case PaymentMethod.CASH:
        return "CASH";
      case PaymentMethod.EPAY:
        return "EPAY";
      case PaymentMethod.CREDIT:
        return "CRED";
    }
  }

}
