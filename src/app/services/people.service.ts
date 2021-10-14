import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private httpClient: HttpClient) { }

  getPeople(): Observable<Array<any>> {
    return this.httpClient.get<Array<any>>('http://localhost:5052/api/People');
  }

  getSeedPeople(seeds: number): Observable<Array<any>> {
    console.log('Api');
    return this.httpClient.get<Array<any>>('http://localhost:5052/api/People/Seed?amount=' + seeds.toString());
  }

  getAllEverCount(): Observable<number> {
    return this.httpClient.get<number>('http://localhost:5052/api/People/allEverCount');
  }

  getAliveCount(): Observable<number> {
    return this.httpClient.get<number>('http://localhost:5052/api/People/aliveCount');
  }

  getDeathCount(): Observable<number> {
    return this.httpClient.get<number>('http://localhost:5052/api/People/deathCount');
  }

  getMateCount(): Observable<number> {
    return this.httpClient.get<number>('http://localhost:5052/api/People/mateCount');
  }
}
