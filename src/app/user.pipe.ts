import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  constructor(private database: AngularFireDatabase){}
  transform(value: string, ...args: unknown[]): Observable<User> {
    return this.database.object("users/" + value).valueChanges() as Observable<User>;
  }

}
