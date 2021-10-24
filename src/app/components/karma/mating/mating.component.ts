import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AgeRangeRequest } from 'src/app/Models/Request/age-range-request';
import { PeopleService } from 'src/app/services/people.service';
import { WorldService } from 'src/app/services/world.service';

@Component({
  selector: 'app-mating',
  templateUrl: './mating.component.html',
  styleUrls: ['./mating.component.scss']
})
export class MatingComponent implements OnInit {

  data2$ = new Subject<any>();
  data2 = [
    {
      "name": "With mates",
      "value": 0
    },
    {
      "name": "Without mates",
      "value": 0
    },
    {
      "name": "To young",
      "value": 0
    },
    {
      "name": "Old enough",
      "value": 0
    }
  ];

  formattedDate: string = '';

  // options
  showLegend: boolean = true;
  gradient: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Count';
  yAxisLabel: string = 'Mate Status';
  showXAxis: boolean = true;
  showYAxis: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  allowPoling: boolean = true;
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
  currentDate$: Observable<Date>;

  constructor(
    private peopleService: PeopleService,
    private worldService: WorldService) {
    this.mateCount$ = peopleService.getMateCount().pipe(take(1));
    this.withoutMateCount$ = peopleService.getMateCount().pipe(take(1));
    this.currentDate$ = worldService.getCurrentDate().pipe(take(1));
  }

  ngOnInit(): void {
    this.startPolling();
  }

  startPolling(): void {
    this.mateCount$ = this.peopleService.getMateCount().pipe(take(1));
    this.mateCount$.subscribe(x => {
      this.data2[0].value = x;
      const newData = JSON.parse(JSON.stringify(this.data2));
      this.data2$.next(newData);
    });

    this.withoutMateCount$ = this.peopleService.getWithoutMateCount().pipe(take(1));
    this.withoutMateCount$.subscribe(x => {
      this.data2[1].value = x;
      const newData = JSON.parse(JSON.stringify(this.data2));
      this.data2$.next(newData);
    });

    this.currentDate$ = this.worldService.getCurrentDate().pipe(take(1));

    this.currentDate$.pipe(take(1)).subscribe(date => {
      this.formattedDate = new Date(date).toDateString();
      const ageRangeRequest1 = new AgeRangeRequest();
      ageRangeRequest1.currentDate = date;
      ageRangeRequest1.minAge = 0;
      ageRangeRequest1.maxAge = 20;
      this.zeroToTwentyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest1).pipe(take(1));

      const ageRangeRequest2 = new AgeRangeRequest();
      ageRangeRequest2.currentDate = date;
      ageRangeRequest2.minAge = 21;
      ageRangeRequest2.maxAge = 30;
      this.twentyToThirtyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest2).pipe(take(1));

      const ageRangeRequest3 = new AgeRangeRequest();
      ageRangeRequest3.currentDate = date;
      ageRangeRequest3.minAge = 31;
      ageRangeRequest3.maxAge = 40;
      this.thirtyToFortyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest3).pipe(take(1));

      const ageRangeRequest4 = new AgeRangeRequest();
      ageRangeRequest4.currentDate = date;
      ageRangeRequest4.minAge = 41;
      ageRangeRequest4.maxAge = 50;
      this.fortyToFiftyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest4).pipe(take(1));

      const ageRangeRequest5 = new AgeRangeRequest();
      ageRangeRequest5.currentDate = date;
      ageRangeRequest5.minAge = 51;
      ageRangeRequest5.maxAge = 60;
      this.fiftyToSixtyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest5).pipe(take(1));

      const ageRangeRequest6 = new AgeRangeRequest();
      ageRangeRequest6.currentDate = date;
      ageRangeRequest6.minAge = 61;
      ageRangeRequest6.maxAge = 70;
      this.sixtyToSeventyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest6).pipe(take(1));

      const ageRangeRequest7 = new AgeRangeRequest();
      ageRangeRequest7.currentDate = date;
      ageRangeRequest7.minAge = 71;
      ageRangeRequest7.maxAge = 80;
      this.seventyToEightyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest7).pipe(take(1));

      const ageRangeRequest8 = new AgeRangeRequest();
      ageRangeRequest8.currentDate = date;
      ageRangeRequest8.minAge = 81;
      ageRangeRequest8.maxAge = 90;
      this.eightyToNinetyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest8).pipe(take(1));

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
        this.data2[2].value = x[0];
        this.data2[3].value = x[1] + x[2] + x[3] + x[4] + x[5] + x[6] + x[7];
        const newData2 = JSON.parse(JSON.stringify(this.data2));
        this.data2$.next(newData2);
      });
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
