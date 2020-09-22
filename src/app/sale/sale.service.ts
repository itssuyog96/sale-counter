import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { SaleEntry } from './sale.interface';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private database: AngularFireDatabase, private snackBar: MatSnackBar) { }

  snackBarConfig: MatSnackBarConfig = {
    duration: 1000,
  }
  message: string;
  inProgress: boolean = false;
  public addSaleEntry(saleEntry: SaleEntry)
  {
    this.inProgress = true;
    this.database.list(saleEntry.date + "/" + saleEntry.userId).push(saleEntry).then(res => {
      if(res)
      {
        this.message = saleEntry.amount > 0 ? "Sale Entry Successfull" : "Undo Last Sale Entry Successfull";
      } else {
        this.message = "Sale Entry Failed!";
      }
      this.inProgress = false;
      this.snackBar.open(this.message, null, this.snackBarConfig);
    });
  }
}
