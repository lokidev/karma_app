import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private httpClient: HttpClient) { }

  getPeople() {
    return this.httpClient.get<Array<any>>('http://localhost:5052/api/People');
  }

  getAllEverCount() {
    return this.httpClient.get<number>('https://localhost:5052/api/People/allEverCount');
  }

  getAliveCount() {
    return this.httpClient.get<number>('https://localhost:5052/api/People/aliveCount');
  }

  getDeathCount() {
    return this.httpClient.get<number>('https://localhost:5052/api/People/deathCount');
  }

  getMateCount() {
    return this.httpClient.get<number>('https://localhost:5052/api/People/mateCount');
  }
}
