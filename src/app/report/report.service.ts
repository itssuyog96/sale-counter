import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DateService } from '../date.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private database: AngularFireDatabase, 
    private auth:AuthService, 
    private router: Router,
    private dateService: DateService) { }

  getDaySaleEntriesByUserId(userId) {
    return this.database.list(this.dateService.getFormattedDate() + "/" + userId).valueChanges();
  }

  getMyDaySaleEntries() {
    if(this.auth.user)
    {
      return this.database.list(this.dateService.getFormattedDate() + "/" + this.auth.user.uid).valueChanges();
    } else {
      this.router.navigate(['login']);
    }
  }
}
