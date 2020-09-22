import { Component, OnInit } from '@angular/core';
import { PaymentMethod} from '../payment-method.enum';
import { SaleService } from './sale.service';
import { SaleEntry } from './sale.interface';

import * as firebase from 'firebase';
import { AuthService } from '../auth.service';
import { DateService } from '../date.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  amount: number = 0;
  amountDisplay: string = "0";
  isDecimal: boolean = false;
  range: number = -1;
  decimalRange: number = 0;
  paymentMethod = PaymentMethod;
  lastSaleEntry: SaleEntry = null;
  constructor(public saleService: SaleService, private auth: AuthService, private dateService: DateService) { }

  ngOnInit(): void {
    this.clearAll();
  }

  account(method: PaymentMethod) {
    if(this.amount != 0){
      const sale = this.prepareSaleEntry(method);
      this.saleService.addSaleEntry(sale);
      this.lastSaleEntry = sale;
    }
    this.clearAll();
  }

  undoLastSale() {
    let sale = this.lastSaleEntry;
    sale.amount = -sale.amount;
    this.saleService.addSaleEntry(sale);
    this.lastSaleEntry = null;
  }

  register(input) {
    if(input != null && input != undefined)
    {
      switch(input)
      {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          if(this.isDecimal)
          {
            this.decimalRange++;
            //(this.decimalRange > 0 ? Math.pow(0.1, this.decimalRange) : 0.1 )
            let val = this.amount;

            //integer part
            let a = parseInt("" + val);

            //decimal part
            let b = val - a;

            //update decimal part
            b += input * Math.pow(0.1, this.decimalRange);

            //final update
            this.amount = this.round(a + b, this.decimalRange);
          } else {
            this.amount = (this.amount * 10) + input;
          }
          break;
        case 0:
          if(this.isDecimal)
          {
            this.decimalRange++;
          } else {
            if(this.amount === 0)
              return;
            this.amount *= 10;
          }
          break;
        case 'C':
          this.clearAll();
          break;
        case '.':
          this.isDecimal = true;
          break;
      }
      let showDecimalPoint = this.decimalRange == 0 && this.isDecimal;
      this.amountDisplay = this.amount.toFixed(this.decimalRange).toString();
      this.amountDisplay += showDecimalPoint ? "." : "";
    }
  }

  private clearAll()
  {
    this.amount = 0;
    this.decimalRange = 0;
    this.isDecimal = false;
    this.amountDisplay = "0";
  }

  private round(num, decimalPlaces) {
    num = Math.round(parseFloat(num + "e" + decimalPlaces));
    return Number(num + "e" + -decimalPlaces);
  }

  private prepareSaleEntry (method: PaymentMethod): SaleEntry {
    const saleEntry: SaleEntry = {
      method,
      amount: this.amount,
      userId: this.auth.user.uid,
      recordedOn: firebase.database.ServerValue.TIMESTAMP,
      date: this.dateService.getFormattedDate()
    }
    return saleEntry;
  }

}
