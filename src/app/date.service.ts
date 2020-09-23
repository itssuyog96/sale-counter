import { Injectable } from '@angular/core';
import * as _moment from 'moment/moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  moment: _moment.Moment;
  constructor() { 
  }

  getFormattedDate(){
    this.moment = _moment(new Date());
    return this.moment.format("DD-MM-YYYY").toString();
  }
}
