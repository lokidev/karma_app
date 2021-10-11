import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorldService {

  constructor(private httpClient: HttpClient) { }

  getCurrentDate() {
    return this.httpClient.get<Date>('https://localhost:5053/api/World/currentDate');
  }

  getPeopleCount() {
    return this.httpClient.get<number>('https://localhost:5053/api/World/peopleCount');
  }

  getStartClock() {
    return this.httpClient.get<void>('https://localhost:5053/api/World/startClock');
  }

  getStopClock() {
    return this.httpClient.get<void>('https://localhost:5053/api/World/stopClock');
  }
}
