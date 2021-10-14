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

  getSeedPeople(seeds: number){
    return this.httpClient.get<Array<any>>('http://localhost:5002/api/People/Seed?amount=' + seeds.toString());
  }

  getAllEverCount() {
    return this.httpClient.get<number>('http://localhost:5052/api/People/allEverCount');
  }

  getAliveCount() {
    return this.httpClient.get<number>('http://localhost:5052/api/People/aliveCount');
  }

  getDeathCount() {
    return this.httpClient.get<number>('http://localhost:5052/api/People/deathCount');
  }

  getMateCount() {
    return this.httpClient.get<number>('http://localhost:5052/api/People/mateCount');
  }
}
