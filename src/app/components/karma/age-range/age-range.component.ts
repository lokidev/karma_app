import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { AgeRangeRequest } from 'src/app/Models/Request/age-range-request';
import { PeopleService } from 'src/app/services/people.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-age-range',
  templateUrl: './age-range.component.html',
  styleUrls: ['./age-range.component.scss']
})
export class AgeRangeComponent implements OnInit, OnDestroy {

  currentDate$: Observable<any>;

  data1$ = new Subject<any>();
  data1 = [
    {
      "name": "00-18",
      "value": 0
    },
    {
      "name": "19-30",
      "value": 0
    },
    {
      "name": "31-40",
      "value": 0
    },
    {
      "name": "41-50",
      "value": 0
    },
    {
      "name": "51-60",
      "value": 0
    },
    {
      "name": "61-70",
      "value": 0
    },
    {
      "name": "71-80",
      "value": 0
    },
    {
      "name": "81-90",
      "value": 0
    }
  ];

  legend: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  zeroToTwentyCount$: Observable<number> = new Observable<number>();
  twentyToThirtyCount$: Observable<number> = new Observable<number>();
  thirtyToFortyCount$: Observable<number> = new Observable<number>();
  fortyToFiftyCount$: Observable<number> = new Observable<number>();
  fiftyToSixtyCount$: Observable<number> = new Observable<number>();
  sixtyToSeventyCount$: Observable<number> = new Observable<number>();
  seventyToEightyCount$: Observable<number> = new Observable<number>();
  eightyToNinetyCount$: Observable<number> = new Observable<number>();

  componentDestroyed$ = new Subject<void>();

  constructor(private peopleService: PeopleService,
    private store: Store<any>) {
    this.currentDate$ = this.store.select(state => state).pipe(takeUntil(this.componentDestroyed$));
  }

  ngOnInit(): void {
    this.currentDate$.pipe(takeUntil(this.componentDestroyed$)).subscribe(state => {
      const ageRangeRequest1 = new AgeRangeRequest();
      ageRangeRequest1.currentDate = state.karma.currDate;
      ageRangeRequest1.minAge = 0;
      ageRangeRequest1.maxAge = 18;
      this.zeroToTwentyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest1).pipe(take(1));

      const ageRangeRequest2 = new AgeRangeRequest();
      ageRangeRequest2.currentDate = state.karma.currDate;
      ageRangeRequest2.minAge = 19;
      ageRangeRequest2.maxAge = 30;
      this.twentyToThirtyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest2).pipe(take(1));

      const ageRangeRequest3 = new AgeRangeRequest();
      ageRangeRequest3.currentDate = state.karma.currDate;
      ageRangeRequest3.minAge = 31;
      ageRangeRequest3.maxAge = 40;
      this.thirtyToFortyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest3).pipe(take(1));

      const ageRangeRequest4 = new AgeRangeRequest();
      ageRangeRequest4.currentDate = state.karma.currDate;
      ageRangeRequest4.minAge = 41;
      ageRangeRequest4.maxAge = 50;
      this.fortyToFiftyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest4).pipe(take(1));

      const ageRangeRequest5 = new AgeRangeRequest();
      ageRangeRequest5.currentDate = state.karma.currDate;
      ageRangeRequest5.minAge = 51;
      ageRangeRequest5.maxAge = 60;
      this.fiftyToSixtyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest5).pipe(take(1));

      const ageRangeRequest6 = new AgeRangeRequest();
      ageRangeRequest6.currentDate = state.karma.currDate;
      ageRangeRequest6.minAge = 61;
      ageRangeRequest6.maxAge = 70;
      this.sixtyToSeventyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest6).pipe(take(1));

      const ageRangeRequest7 = new AgeRangeRequest();
      ageRangeRequest7.currentDate = state.karma.currDate;
      ageRangeRequest7.minAge = 71;
      ageRangeRequest7.maxAge = 80;
      this.seventyToEightyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest7).pipe(take(1));

      const ageRangeRequest8 = new AgeRangeRequest();
      ageRangeRequest8.currentDate = state.karma.currDate;
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

      ageCounts$.subscribe(counts => {
        this.data1[0].value = counts[0];
        this.data1[1].value = counts[1];
        this.data1[2].value = counts[2];
        this.data1[3].value = counts[3];
        this.data1[4].value = counts[4];
        this.data1[5].value = counts[5];
        this.data1[6].value = counts[6];
        this.data1[7].value = counts[7];
        const newData = JSON.parse(JSON.stringify(this.data1));
        this.data1$.next(newData);
      });
    });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
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
