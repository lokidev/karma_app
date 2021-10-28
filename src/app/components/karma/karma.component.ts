import { Component, OnDestroy, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/services/people.service';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { WorldService } from 'src/app/services/world.service';
import { AgeRangeRequest } from 'src/app/Models/Request/age-range-request';
import { KarmaService } from 'src/app/services/karma.service';
import { WorldTime } from '../store/models/worldTime.model';
import * as KarmaPageActions from '../store/actions/karma.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-karma',
  templateUrl: './karma.component.html',
  styleUrls: ['./karma.component.scss']
})
export class KarmaComponent implements OnInit, OnDestroy {

  formattedDate: string = '';

  allowPoling: boolean = true;
  currentDate$: Observable<Date>;

  constructor(private peopleService: PeopleService,
    private worldService: WorldService,
    private store: Store<any>) {
    this.currentDate$ = worldService.getCurrentDate().pipe(take(1));
  }

  ngOnInit(): void {
    this.startPolling();
  }

  ngOnDestroy(): void {

  }

  startPolling(): void {
    this.currentDate$ = this.worldService.getCurrentDate().pipe(take(1));

    this.currentDate$.pipe(take(1)).subscribe(date => {
      this.store.dispatch(KarmaPageActions.setWorldTime({ worldTime: { currDate: date } }));
      this.formattedDate = new Date(date).toDateString();
    });

    if (this.allowPoling) {
      setTimeout(() => { this.startPolling(); }, 12000);
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

}
