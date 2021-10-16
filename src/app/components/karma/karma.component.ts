import { Component, OnDestroy, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/services/people.service';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { WorldService } from 'src/app/services/world.service';
import { AgeRangeRequest } from 'src/app/Models/Request/age-range-request';

@Component({
  selector: 'app-karma',
  templateUrl: './karma.component.html',
  styleUrls: ['./karma.component.scss']
})
export class KarmaComponent implements OnInit, OnDestroy {

  data = [
    {
      "name": "People Alive",
      "value": 156
    },
    {
      "name": "People Dead",
      "value": 89
    },
    {
      "name": "People with mates",
      "value": 74
    },
    {
      "name": "All People",
      "value": 245
    }
  ];

  view: number[] = [500, 400];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  allowPoling: boolean = true;
  allEverCount$: Observable<number>;
  aliveCount$: Observable<number>;
  deathCount$: Observable<number>;
  mateCount$: Observable<number>;
  ZeroToTwentyCount$: Observable<number> = new Observable<number>();
  TwentyToThirtyCount$: Observable<number> = new Observable<number>();
  ThirtyToFortyCount$: Observable<number> = new Observable<number>();
  FortyToFiftyCount$: Observable<number> = new Observable<number>();
  FiftyToSixtyCount$: Observable<number> = new Observable<number>();
  SixtyToSeventyCount$: Observable<number> = new Observable<number>();
  SeventyToEightyCount$: Observable<number> = new Observable<number>();
  EightyToNinetyCount$: Observable<number> = new Observable<number>();
  worldPeopleCount$: Observable<number>;
  currentDate$: Observable<Date>;

  constructor(
    private peopleService: PeopleService,
    private worldService: WorldService) {
    this.allEverCount$ = peopleService.getAllEverCount().pipe(take(1));
    this.aliveCount$ = peopleService.getAliveCount().pipe(take(1));
    this.deathCount$ = peopleService.getDeathCount().pipe(take(1));
    this.mateCount$ = peopleService.getMateCount().pipe(take(1));
    this.worldPeopleCount$ = worldService.getPeopleCount().pipe(take(1));
    this.currentDate$ = worldService.getCurrentDate().pipe(take(1));
  }

  ngOnInit(): void {
    this.currentDate$.pipe(take(1)).subscribe(x => {
      const ageRangeRequest1 = new AgeRangeRequest();
      ageRangeRequest1.currentDate = x;
      ageRangeRequest1.minAge = 0;
      ageRangeRequest1.maxAge = 20;
      this.ZeroToTwentyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest1).pipe(take(1));

      const ageRangeRequest2 = new AgeRangeRequest();
      ageRangeRequest2.currentDate = x;
      ageRangeRequest2.minAge = 20;
      ageRangeRequest2.maxAge = 30;
      this.TwentyToThirtyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest2).pipe(take(1));

      const ageRangeRequest3 = new AgeRangeRequest();
      ageRangeRequest3.currentDate = x;
      ageRangeRequest3.minAge = 30;
      ageRangeRequest3.maxAge = 40;
      this.ThirtyToFortyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest3).pipe(take(1));

      const ageRangeRequest4 = new AgeRangeRequest();
      ageRangeRequest4.currentDate = x;
      ageRangeRequest4.minAge = 40;
      ageRangeRequest4.maxAge = 50;
      this.FortyToFiftyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest4).pipe(take(1));

      const ageRangeRequest5 = new AgeRangeRequest();
      ageRangeRequest5.currentDate = x;
      ageRangeRequest5.minAge = 50;
      ageRangeRequest5.maxAge = 60;
      this.FiftyToSixtyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest5).pipe(take(1));

      const ageRangeRequest6 = new AgeRangeRequest();
      ageRangeRequest6.currentDate = x;
      ageRangeRequest6.minAge = 60;
      ageRangeRequest6.maxAge = 70;
      this.SixtyToSeventyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest6).pipe(take(1));

      const ageRangeRequest7 = new AgeRangeRequest();
      ageRangeRequest7.currentDate = x;
      ageRangeRequest7.minAge = 70;
      ageRangeRequest7.maxAge = 80;
      this.SeventyToEightyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest7).pipe(take(1));

      const ageRangeRequest8 = new AgeRangeRequest();
      ageRangeRequest8.currentDate = x;
      ageRangeRequest8.minAge = 80;
      ageRangeRequest8.maxAge = 90;
      this.EightyToNinetyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest8).pipe(take(1));
    });
  }

  ngOnDestroy(): void {

  }

  startPolling(): void {
    console.log('Iteration');
    this.allEverCount$ = this.peopleService.getAllEverCount().pipe(take(1));
    this.aliveCount$ = this.peopleService.getAliveCount().pipe(take(1));
    this.deathCount$ = this.peopleService.getDeathCount().pipe(take(1));
    this.mateCount$ = this.peopleService.getMateCount().pipe(take(1));
    this.worldPeopleCount$ = this.worldService.getPeopleCount().pipe(take(1));
    this.currentDate$ = this.worldService.getCurrentDate().pipe(take(1));

    this.currentDate$.pipe(take(1)).subscribe(x => {
      const ageRangeRequest1 = new AgeRangeRequest();
      ageRangeRequest1.currentDate = x;
      ageRangeRequest1.minAge = 0;
      ageRangeRequest1.maxAge = 20;
      this.ZeroToTwentyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest1).pipe(take(1));

      const ageRangeRequest2 = new AgeRangeRequest();
      ageRangeRequest2.currentDate = x;
      ageRangeRequest2.minAge = 20;
      ageRangeRequest2.maxAge = 30;
      this.TwentyToThirtyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest2).pipe(take(1));

      const ageRangeRequest3 = new AgeRangeRequest();
      ageRangeRequest3.currentDate = x;
      ageRangeRequest3.minAge = 30;
      ageRangeRequest3.maxAge = 40;
      this.ThirtyToFortyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest3).pipe(take(1));

      const ageRangeRequest4 = new AgeRangeRequest();
      ageRangeRequest4.currentDate = x;
      ageRangeRequest4.minAge = 40;
      ageRangeRequest4.maxAge = 50;
      this.FortyToFiftyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest4).pipe(take(1));

      const ageRangeRequest5 = new AgeRangeRequest();
      ageRangeRequest5.currentDate = x;
      ageRangeRequest5.minAge = 50;
      ageRangeRequest5.maxAge = 60;
      this.FiftyToSixtyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest5).pipe(take(1));

      const ageRangeRequest6 = new AgeRangeRequest();
      ageRangeRequest6.currentDate = x;
      ageRangeRequest6.minAge = 60;
      ageRangeRequest6.maxAge = 70;
      this.SixtyToSeventyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest6).pipe(take(1));

      const ageRangeRequest7 = new AgeRangeRequest();
      ageRangeRequest7.currentDate = x;
      ageRangeRequest7.minAge = 70;
      ageRangeRequest7.maxAge = 80;
      this.SeventyToEightyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest7).pipe(take(1));

      const ageRangeRequest8 = new AgeRangeRequest();
      ageRangeRequest8.currentDate = x;
      ageRangeRequest8.minAge = 80;
      ageRangeRequest8.maxAge = 90;
      this.EightyToNinetyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest8).pipe(take(1));
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

}
