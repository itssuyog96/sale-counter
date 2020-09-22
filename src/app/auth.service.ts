import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { UserObject } from './user-object';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public user: User;
  public isAdmin: boolean = false;
  constructor(private auth: AngularFireAuth, private database: AngularFireDatabase) {
    this.auth.authState.subscribe(user => {
      if(user)
      {
        this.user = user;
        const userObject: UserObject = {
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL
        }
        this.database.object("users/" + user.uid).update(userObject);
        const getRole = this.database.object("roles/" + user.uid).valueChanges().subscribe(role => {
          if(role)
          {
            this.isAdmin = role['admin'];
            getRole.unsubscribe();
          }
        })
      } else {
        this.user = null;
        this.isAdmin = false;
      }
    });
   }

   public signOut()
   {
     this.auth.signOut();
   }
}
