import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getFormattedDate(){
    return new Date().toLocaleDateString().replace(/\//g, "-");
  }
}
