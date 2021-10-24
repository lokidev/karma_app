import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogsRequest } from '../Models/Request/logs-request';

@Injectable({
  providedIn: 'root'
})
export class KarmaService {

  constructor(private httpClient: HttpClient) { }

  getLogsCount(body: LogsRequest): Observable<number> {
    return this.httpClient.post<number>('http://localhost:5051/api/Karma/logsCount', body);
  }
}
