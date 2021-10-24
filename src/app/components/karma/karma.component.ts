import { Component, OnDestroy, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/services/people.service';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { WorldService } from 'src/app/services/world.service';
import { AgeRangeRequest } from 'src/app/Models/Request/age-range-request';
import { KarmaService } from 'src/app/services/karma.service';
import { LogsRequest } from 'src/app/Models/Request/logs-request';

@Component({
  selector: 'app-karma',
  templateUrl: './karma.component.html',
  styleUrls: ['./karma.component.scss']
})
export class KarmaComponent implements OnInit, OnDestroy {

  data1$ = new Subject<any>();
  data1 = [
    {
      "name": "People 00-20",
      "value": 0
    },
    {
      "name": "People 20-30",
      "value": 0
    },
    {
      "name": "People 30-40",
      "value": 0
    },
    {
      "name": "People 40-50",
      "value": 0
    },
    {
      "name": "People 50-60",
      "value": 0
    },
    {
      "name": "People 60-70",
      "value": 0
    },
    {
      "name": "People 70-80",
      "value": 0
    },
    {
      "name": "People 80-90",
      "value": 0
    }
  ];

  data2$ = new Subject<any>();
  data2 = [
    {
      "name": "People with mates",
      "value": 0
    },
    {
      "name": "People without mates",
      "value": 0
    }
  ];

  data3$ = new Subject<any>();
  data3 = [
    {
      "name": "To young to mate",
      "value": 0
    },
    {
      "name": "Old enough for mate",
      "value": 0
    }
  ];

  data4$ = new Subject<any>();
  data4 = [
    {
      "name": "Born",
      "series": [
        { "name": "", "value": 0 }
      ]
    },
    {
      "name": "Died",
      "series": [
        { "name": "", "value": 0 }
      ]
    },
    {
      "name": "Growth",
      "series": [
        { "name": "", "value": 0 }
      ]
    }
  ];

  view: number[] = [500, 400];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  legend: boolean = true;
  legendPosition: string = 'below';

  gradient: boolean = true;
  isDoughnut: boolean = false;

  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Count';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  allowPoling: boolean = true;
  allEverCount$: Observable<number>;
  aliveCount$: Observable<number>;
  deathCount$: Observable<number>;
  mateCount$: Observable<number>;
  withoutMateCount$: Observable<number>;
  zeroToTwentyCount$: Observable<number> = new Observable<number>();
  twentyToThirtyCount$: Observable<number> = new Observable<number>();
  thirtyToFortyCount$: Observable<number> = new Observable<number>();
  fortyToFiftyCount$: Observable<number> = new Observable<number>();
  fiftyToSixtyCount$: Observable<number> = new Observable<number>();
  sixtyToSeventyCount$: Observable<number> = new Observable<number>();
  seventyToEightyCount$: Observable<number> = new Observable<number>();
  eightyToNinetyCount$: Observable<number> = new Observable<number>();
  worldPeopleCount$: Observable<number>;
  currentDate$: Observable<Date>;

  bornThisYear$: Observable<number> = new Observable<number>();
  diedThisYear$: Observable<number> = new Observable<number>();

  constructor(
    private peopleService: PeopleService,
    private worldService: WorldService,
    private karmaService: KarmaService) {
    this.allEverCount$ = peopleService.getAllEverCount().pipe(take(1));
    this.aliveCount$ = peopleService.getAliveCount().pipe(take(1));
    this.deathCount$ = peopleService.getDeathCount().pipe(take(1));
    this.mateCount$ = peopleService.getMateCount().pipe(take(1));
    this.withoutMateCount$ = peopleService.getMateCount().pipe(take(1));
    this.worldPeopleCount$ = worldService.getPeopleCount().pipe(take(1));
    this.currentDate$ = worldService.getCurrentDate().pipe(take(1));
  }

  ngOnInit(): void {
    this.startPolling();
    this.currentDate$.pipe(take(1)).subscribe(x => {
      const ageRangeRequest1 = new AgeRangeRequest();
      ageRangeRequest1.currentDate = x;
      ageRangeRequest1.minAge = 0;
      ageRangeRequest1.maxAge = 20;
      this.zeroToTwentyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest1).pipe(take(1));

      const ageRangeRequest2 = new AgeRangeRequest();
      ageRangeRequest2.currentDate = x;
      ageRangeRequest2.minAge = 20;
      ageRangeRequest2.maxAge = 30;
      this.twentyToThirtyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest2).pipe(take(1));

      const ageRangeRequest3 = new AgeRangeRequest();
      ageRangeRequest3.currentDate = x;
      ageRangeRequest3.minAge = 30;
      ageRangeRequest3.maxAge = 40;
      this.thirtyToFortyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest3).pipe(take(1));

      const ageRangeRequest4 = new AgeRangeRequest();
      ageRangeRequest4.currentDate = x;
      ageRangeRequest4.minAge = 40;
      ageRangeRequest4.maxAge = 50;
      this.fortyToFiftyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest4).pipe(take(1));

      const ageRangeRequest5 = new AgeRangeRequest();
      ageRangeRequest5.currentDate = x;
      ageRangeRequest5.minAge = 50;
      ageRangeRequest5.maxAge = 60;
      this.fiftyToSixtyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest5).pipe(take(1));

      const ageRangeRequest6 = new AgeRangeRequest();
      ageRangeRequest6.currentDate = x;
      ageRangeRequest6.minAge = 60;
      ageRangeRequest6.maxAge = 70;
      this.sixtyToSeventyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest6).pipe(take(1));

      const ageRangeRequest7 = new AgeRangeRequest();
      ageRangeRequest7.currentDate = x;
      ageRangeRequest7.minAge = 70;
      ageRangeRequest7.maxAge = 80;
      this.seventyToEightyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest7).pipe(take(1));

      const ageRangeRequest8 = new AgeRangeRequest();
      ageRangeRequest8.currentDate = x;
      ageRangeRequest8.minAge = 80;
      ageRangeRequest8.maxAge = 90;
      this.eightyToNinetyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest8).pipe(take(1));
    });
  }

  ngOnDestroy(): void {

  }

  startPolling(): void {
    this.allEverCount$ = this.peopleService.getAllEverCount().pipe(take(1));

    this.mateCount$ = this.peopleService.getMateCount().pipe(take(1));
    this.mateCount$.subscribe(x => {
      this.data2[0].value = x;
      const newData = JSON.parse(JSON.stringify(this.data2));
      this.data2$.next(newData);
    });

    this.deathCount$ = this.peopleService.getDeathCount().pipe(take(1));

    this.withoutMateCount$ = this.peopleService.getWithoutMateCount().pipe(take(1));
    this.withoutMateCount$.subscribe(x => {
      this.data2[1].value = x;
      const newData = JSON.parse(JSON.stringify(this.data2));
      this.data2$.next(newData);
    });

    this.worldPeopleCount$ = this.worldService.getPeopleCount().pipe(take(1));
    this.currentDate$ = this.worldService.getCurrentDate().pipe(take(1));

    this.currentDate$.pipe(take(1)).subscribe(date => {
      const ageRangeRequest1 = new AgeRangeRequest();
      ageRangeRequest1.currentDate = date;
      ageRangeRequest1.minAge = 0;
      ageRangeRequest1.maxAge = 20;
      this.zeroToTwentyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest1).pipe(take(1));
      this.zeroToTwentyCount$.subscribe(x => {
        this.data1[0].value = x;
        const newData = JSON.parse(JSON.stringify(this.data1));
        this.data1$.next(newData);
        this.data3[0].value = x;
        const newData3 = JSON.parse(JSON.stringify(this.data3));
        this.data3$.next(newData3);
      });

      const ageRangeRequest2 = new AgeRangeRequest();
      ageRangeRequest2.currentDate = date;
      ageRangeRequest2.minAge = 20;
      ageRangeRequest2.maxAge = 30;
      this.twentyToThirtyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest2).pipe(take(1));
      this.twentyToThirtyCount$.subscribe(x => {
        this.data1[1].value = x;
        const newData = JSON.parse(JSON.stringify(this.data1));
        this.data1$.next(newData);
      });

      const ageRangeRequest3 = new AgeRangeRequest();
      ageRangeRequest3.currentDate = date;
      ageRangeRequest3.minAge = 30;
      ageRangeRequest3.maxAge = 40;
      this.thirtyToFortyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest3).pipe(take(1));
      this.thirtyToFortyCount$.subscribe(x => {
        this.data1[2].value = x;
        const newData = JSON.parse(JSON.stringify(this.data1));
        this.data1$.next(newData);
      });

      const ageRangeRequest4 = new AgeRangeRequest();
      ageRangeRequest4.currentDate = date;
      ageRangeRequest4.minAge = 40;
      ageRangeRequest4.maxAge = 50;
      this.fortyToFiftyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest4).pipe(take(1));
      this.fortyToFiftyCount$.subscribe(x => {
        this.data1[3].value = x;
        const newData = JSON.parse(JSON.stringify(this.data1));
        this.data1$.next(newData);
      });

      const ageRangeRequest5 = new AgeRangeRequest();
      ageRangeRequest5.currentDate = date;
      ageRangeRequest5.minAge = 50;
      ageRangeRequest5.maxAge = 60;
      this.fiftyToSixtyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest5).pipe(take(1));
      this.fiftyToSixtyCount$.subscribe(x => {
        this.data1[4].value = x;
        const newData = JSON.parse(JSON.stringify(this.data1));
        this.data1$.next(newData);
      });

      const ageRangeRequest6 = new AgeRangeRequest();
      ageRangeRequest6.currentDate = date;
      ageRangeRequest6.minAge = 60;
      ageRangeRequest6.maxAge = 70;
      this.sixtyToSeventyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest6).pipe(take(1));
      this.sixtyToSeventyCount$.subscribe(x => {
        this.data1[5].value = x;
        const newData = JSON.parse(JSON.stringify(this.data1));
        this.data1$.next(newData);
      });

      const ageRangeRequest7 = new AgeRangeRequest();
      ageRangeRequest7.currentDate = date;
      ageRangeRequest7.minAge = 70;
      ageRangeRequest7.maxAge = 80;
      this.seventyToEightyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest7).pipe(take(1));
      this.seventyToEightyCount$.subscribe(x => {
        this.data1[6].value = x;
        const newData = JSON.parse(JSON.stringify(this.data1));
        this.data1$.next(newData);
      });

      const ageRangeRequest8 = new AgeRangeRequest();
      ageRangeRequest8.currentDate = date;
      ageRangeRequest8.minAge = 80;
      ageRangeRequest8.maxAge = 90;
      this.eightyToNinetyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest8).pipe(take(1));
      this.eightyToNinetyCount$.subscribe(x => {
        this.data1[7].value = x;
        const newData = JSON.parse(JSON.stringify(this.data1));
        this.data1$.next(newData);
      });

      // const overTwenty$ = combineLatest([
      //   this.twentyToThirtyCount$,
      //   this.thirtyToFortyCount$,
      //   this.fortyToFiftyCount$,
      //   this.fiftyToSixtyCount$,
      //   this.sixtyToSeventyCount$,
      //   this.seventyToEightyCount$,
      //   this.eightyToNinetyCount$
      // ]).pipe(
      //   map(([twenty, thirty, forty, fifty, sixty, seventy, eighty]) => twenty + thirty + forty + fifty + sixty + seventy + eighty),
      // );

      const ageCounts$ = combineLatest([
        this.zeroToTwentyCount$,
        this.twentyToThirtyCount$,
        this.thirtyToFortyCount$,
        this.fortyToFiftyCount$,
        this.fiftyToSixtyCount$,
        this.sixtyToSeventyCount$,
        this.seventyToEightyCount$,
        this.eightyToNinetyCount$
      ]).pipe(
        map(([zero, twenty, thirty, forty, fifty, sixty, seventy, eighty]) => [zero, twenty, thirty, forty, fifty, sixty, seventy, eighty])
      );

      ageCounts$.subscribe(x => {
        this.data3[1].value = x[1] + x[2] + x[3] + x[4] + x[5] + x[6] + x[7];
        const newData3 = JSON.parse(JSON.stringify(this.data3));
        this.data3$.next(newData3);
      });

      if (this.data4[0].series.filter(f => f.name === date.toString()).length === 0) {
        const bornRequest = new LogsRequest();
        bornRequest.currDateTime = date;
        bornRequest.objectType = "Person";
        bornRequest.messageType = "Concieved";
        this.bornThisYear$ = this.karmaService.getLogsCount(bornRequest).pipe(take(1));
        // this.bornThisYear$.subscribe(n => {

        //   this.data4[0].series = this.data4[0].series.slice(1, 30);
        //   this.data4[0].series.push({ name: date.toString(), value: n });
        //   const newData = JSON.parse(JSON.stringify(this.data4));
        //   this.data4$.next(newData);
        // });

        const diedRequest = new LogsRequest();
        diedRequest.currDateTime = date;
        diedRequest.objectType = "Person";
        diedRequest.messageType = "Died";
        this.diedThisYear$ = this.karmaService.getLogsCount(diedRequest).pipe(take(1));
        // this.diedThisYear$.subscribe(n => {

        //   this.data4[1].series = this.data4[1].series.slice(1, 30);
        //   this.data4[1].series.push({ name: date.toString(), value: n });
        //   const newData = JSON.parse(JSON.stringify(this.data4));
        //   this.data4$.next(newData);
        // });

        const birthsDeaths$ = combineLatest([
          this.bornThisYear$,
          this.diedThisYear$
        ]).pipe(
          map(([born, died]) => [born, died])
        );

        birthsDeaths$.subscribe(n => {
          console.log(n[0]);
          console.log(n[1]);
          this.data4[0].series = this.data4[0].series.slice(1, 30);
          this.data4[1].series = this.data4[1].series.slice(1, 30);
          this.data4[2].series = this.data4[2].series.slice(1, 30);
          this.data4[0].series.push({ name: date.toString(), value: n[0] });
          this.data4[1].series.push({ name: date.toString(), value: n[1] });
          this.data4[2].series.push({ name: date.toString(), value: n[0] - n[1] });
          const newData = JSON.parse(JSON.stringify(this.data4));
          this.data4$.next(newData);
        });
      }
    });

    if (this.allowPoling) {
      setTimeout(() => { this.startPolling(); }, 5000);
    }
  }

  startClock(): void {
    this.worldService.getStartClock().subscribe();
  }

  stopClock(): void {
    this.worldService.getStopClock().subscribe();
  }

  seedPeople(amount: number): any[] {
    console.log('Hit');
    this.peopleService.getSeedPeople(amount).subscribe(x => {
      return x;
    });
    return [];
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
