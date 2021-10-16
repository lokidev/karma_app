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
      console.log(x);
      const ageRangeRequest = new AgeRangeRequest();
      ageRangeRequest.currentDate = x;
      ageRangeRequest.minAge = 0;
      ageRangeRequest.maxAge = 20;

      this.ZeroToTwentyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest).pipe(take(1));
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
      console.log(x);
      const ageRangeRequest = new AgeRangeRequest();
      ageRangeRequest.currentDate = x;
      ageRangeRequest.minAge = 0;
      ageRangeRequest.maxAge = 20;

      this.ZeroToTwentyCount$ = this.peopleService.getAgeRangeCount(ageRangeRequest).pipe(take(1));
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
