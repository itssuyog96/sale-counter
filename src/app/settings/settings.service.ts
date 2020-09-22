import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private database: AngularFireDatabase, private auth: AuthService, private router: Router) { }

  public getCompanyUserIds(): Observable<Object[]> {
    if(this.auth.user){
      return this.database.list("company/" + this.auth.user.uid).valueChanges();
    } else {
      this.router.navigate(['login']);
    }
  }
}
