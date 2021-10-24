import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LogsRequest } from 'src/app/Models/Request/logs-request';
import { KarmaService } from 'src/app/services/karma.service';
import { PeopleService } from 'src/app/services/people.service';
import { WorldService } from 'src/app/services/world.service';

@Component({
  selector: 'app-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.scss']
})
export class PopulationComponent implements OnInit {

  mateCount$: Observable<number>;
  withoutMateCount$: Observable<number>;
  currentDate$: Observable<Date>;

  bornThisYear$: Observable<number> = new Observable<number>();
  diedThisYear$: Observable<number> = new Observable<number>();

  data4$ = new Subject<any>();
  data4 = [
    {
      "name": "Born",
      "series": [
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 }
      ]
    },
    {
      "name": "Died",
      "series": [
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 }
      ]
    },
    {
      "name": "Growth",
      "series": [
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 },
        { "name": "", "value": 0 }
      ]
    }
  ];

  formattedDate: string = '';

  // options
  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Count';
  timeline: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  allowPoling: boolean = true;

  constructor(private peopleService: PeopleService,
    private worldService: WorldService,
    private karmaService: KarmaService) {
    this.mateCount$ = peopleService.getMateCount().pipe(take(1));
    this.withoutMateCount$ = peopleService.getMateCount().pipe(take(1));
    this.currentDate$ = worldService.getCurrentDate().pipe(take(1));
  }

  ngOnInit(): void {
    this.startPolling();
  }

  startPolling(): void {
    this.currentDate$ = this.worldService.getCurrentDate().pipe(take(1));

    this.currentDate$.pipe(take(1)).subscribe(date => {
      this.formattedDate = new Date(date).toDateString();

      if (this.data4[0].series.filter(f => f.name === new Date(date.toString()).toDateString()).length === 0) {
        const bornRequest = new LogsRequest();
        bornRequest.currDateTime = date;
        bornRequest.objectType = "Person";
        bornRequest.messageType = "Concieved";
        this.bornThisYear$ = this.karmaService.getLogsCount(bornRequest).pipe(take(1));

        const diedRequest = new LogsRequest();
        diedRequest.currDateTime = date;
        diedRequest.objectType = "Person";
        diedRequest.messageType = "Died";
        this.diedThisYear$ = this.karmaService.getLogsCount(diedRequest).pipe(take(1));

        const birthsDeaths$ = combineLatest([
          this.bornThisYear$,
          this.diedThisYear$
        ]).pipe(
          map(([born, died]) => [born, died])
        );

        birthsDeaths$.subscribe(n => {
          this.data4[0].series = this.data4[0].series.slice(1, 30);
          this.data4[1].series = this.data4[1].series.slice(1, 30);
          this.data4[2].series = this.data4[2].series.slice(1, 30);
          this.data4[0].series.push({ name: new Date(date.toString()).toDateString(), value: n[0] });
          this.data4[1].series.push({ name: new Date(date.toString()).toDateString(), value: n[1] });
          this.data4[2].series.push({ name: new Date(date.toString()).toDateString(), value: n[0] - n[1] });
          const newData4 = JSON.parse(JSON.stringify(this.data4));
          this.data4$.next(newData4);
        });
      }
    });

    if (this.allowPoling) {
      setTimeout(() => { this.startPolling(); }, 5000);
    }
  }

  onSelect(event: any) {
    console.log(event);
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
