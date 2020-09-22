import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from './settings.service';
import { User } from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserObject } from '../user-object';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  messages = [
    {from: "Suyog", subject: "This is a subject", content: "Long long content"},
    {from: "Suyog", subject: "This is a subject", content: "Long long content"}
  ]
  users: UserObject[] = [];
  companyUsersSubscription: Subscription = null;
  constructor(private settingsService: SettingsService, private database: AngularFireDatabase) { }

  ngOnInit(): void {
    this.companyUsersSubscription = this.settingsService.getCompanyUserIds().subscribe(res => {
      if(res) {
        const userIds = res as string[];
        this.users = [];
        userIds.forEach(userId => {
          this.database.object("users/" + userId).valueChanges().subscribe(user => {
            this.users.push(user as UserObject);
          });
        });
      }
    });
  }

  ngOnDestroy(){
    if(this.companyUsersSubscription)
    {
      this.companyUsersSubscription.unsubscribe();
    }
  }

}
