import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService } from './report.service';
import { SaleEntry } from '../sale/sale.interface';
import { SettingsService } from '../settings/settings.service';
import { MatSort, Sort } from '@angular/material/sort';
import { DateService } from '../date.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  saleEntries: Array<SaleEntry[]> = [];
  dataSource = new MatTableDataSource<SaleEntry>([]);
  displayedColumns: string[] = ['method', 'userId', 'recordedOn', 'amount'];
  reportDate: string = "";
  reportTotal: number = 0;

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

              this.reportTotal = 0;
              this.dataSource = new MatTableDataSource<SaleEntry>(finalSaleEntries);
              this.dataSource.sortData(this.dataSource.data, this.sort);
              finalSaleEntries.forEach(saleEntry => {
                this.reportTotal += saleEntry.amount;
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

