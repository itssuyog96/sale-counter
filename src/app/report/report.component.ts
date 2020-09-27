import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService } from './report.service';
import { SaleEntry } from '../sale/sale.interface';
import { SettingsService } from '../settings/settings.service';
import { MatSort, Sort } from '@angular/material/sort';
import { DateService } from '../date.service';
import { PaymentMethod } from '../payment-method.enum';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  paymentMethod = PaymentMethod;
  saleEntries: Array<SaleEntry[]> = [];
  dataSource = new MatTableDataSource<SaleEntry>([]);
  displayedColumns: string[] = ['method', 'userId', 'recordedOn', 'amount'];
  reportDate: string = "";

  reportTotal: number = 0;
  cashTotal: number = 0;
  cardTotal: number = 0;
  creditTotal: number = 0;
  epayTotal: number = 0;
  returnTotal: number = 0;

  constructor(private reportService: ReportService, private settingsService: SettingsService, private dateService: DateService) { }

  ngOnInit(): void {
    this.reportDate = this.dateService.getFormattedDate();
    this.settingsService.getCompanyUserIds().subscribe(res => {
      if(res) {
        const userIds = res as string[];
        this.saleEntries = [];
        userIds.forEach(userId => {
          this.reportService.getDaySaleEntriesByUserId(userId).subscribe(res => {
            if(res)
            {
              const saleEntries = res as SaleEntry[];
              this.saleEntries[userId] = saleEntries;

              let finalSaleEntries = [];

              for(let user in this.saleEntries)
              {
                finalSaleEntries.push(...this.saleEntries[user]);
              }

              this.resetReportTotals();
              this.dataSource = new MatTableDataSource<SaleEntry>(finalSaleEntries);
              this.dataSource.sortData(this.dataSource.data, this.sort);
              finalSaleEntries.forEach(saleEntry => {
                this.reportTotal += saleEntry.amount;
                switch(saleEntry.method as PaymentMethod) {
                  case PaymentMethod.CASH:
                    this.cashTotal += saleEntry.amount;
                    break;
                  case PaymentMethod.CARD:
                    this.cardTotal += saleEntry.amount;
                    break;
                  case PaymentMethod.EPAY:
                    this.epayTotal += saleEntry.amount;
                    break;
                  case PaymentMethod.CREDIT:
                    this.creditTotal += saleEntry.amount;
                    break;
                  case PaymentMethod.RETURN:
                    this.returnTotal += saleEntry.amount;
                    break;
                }
              })
            }
          });
        });
      }
    });
  }

  sortData()
  {
    this.dataSource.data = this.dataSource.sortData(this.dataSource.data, this.sort);
  }

  resetReportTotals() {
    this.reportTotal = 0;
    this.cashTotal = 0;
    this.creditTotal = 0;
    this.cardTotal = 0;
    this.epayTotal = 0;
    this.returnTotal = 0;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

