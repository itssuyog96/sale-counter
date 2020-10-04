import { Injectable } from '@angular/core';
import { SaleEntry } from './sale.interface';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { PaymentMethod } from '../payment-method.enum';

const saleMessage = 'Sale Entry Successful';
const undoSaleMessage = 'Undo Last Sale Entry Successful';
const goodsReturnMessage = 'Goods Returned Successfully';
const failedSaleEntry = 'Sale Entry Failed!';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private store: AngularFirestore, private snackBar: MatSnackBar) { }

  snackBarConfig: MatSnackBarConfig = {
    duration: 1000,
  }
  message: string;
  inProgress: boolean = false;

  public addSaleEntry(saleEntry: SaleEntry)
  {
    this.inProgress = true;

    this.store.collection(`sales/${saleEntry.userId}/${saleEntry.date}`).add(saleEntry).then(res => {
      if(res)
      {
        this.message = saleEntry.amount > 0 ? saleMessage : (saleEntry.method === PaymentMethod.RETURN ? goodsReturnMessage : undoSaleMessage);
      } else {
        this.message = failedSaleEntry;
      }
      this.inProgress = false;
      this.snackBar.open(this.message, null, this.snackBarConfig);
    });
  }
}
