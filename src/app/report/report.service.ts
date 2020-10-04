import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DateService } from '../date.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private store: AngularFirestore, 
    private auth:AuthService, 
    private router: Router,
    private dateService: DateService) { }

  getDaySaleEntriesByUserId(userId) {
    return this.store.collection(`sales/${userId}/${this.dateService.getFormattedDate()}`).valueChanges();
  }

  getMyDaySaleEntries() {
    if(this.auth.user)
    {
      return this.store.collection(`sales/${this.auth.user}/${this.dateService.getFormattedDate()}`).valueChanges();
    } else {
      this.router.navigate(['login']);
    }
  }
}
