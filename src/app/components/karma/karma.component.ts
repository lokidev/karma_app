import { Component, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/services/people.service';
import { Observable, Subject } from 'rxjs';
import { WorldService } from 'src/app/services/world.service';

@Component({
  selector: 'app-karma',
  templateUrl: './karma.component.html',
  styleUrls: ['./karma.component.scss']
})
export class KarmaComponent implements OnInit {

  allowPoling: boolean = true;
  allEverCount$: Observable<number>;
  aliveCount$: Observable<number>;
  deathCount$: Observable<number>;
  mateCount$: Observable<number>;
  worldPeopleCount$: Observable<number>;
  currentDate$: Observable<Date>;

  constructor(
    private peopleService: PeopleService,
    private worldService: WorldService) {
    this.allEverCount$ = peopleService.getAllEverCount().pipe();
    this.aliveCount$ = peopleService.getAliveCount().pipe();
    this.deathCount$ = peopleService.getDeathCount().pipe();
    this.mateCount$ = peopleService.getMateCount().pipe();
    this.worldPeopleCount$ = worldService.getPeopleCount().pipe();
    this.currentDate$ = worldService.getCurrentDate().pipe();
  }

  ngOnInit(): void {

  }

  startPolling(): void {
    console.log('Iteration');
    this.allEverCount$ = this.peopleService.getAllEverCount().pipe();
    this.aliveCount$ = this.peopleService.getAliveCount().pipe();
    this.deathCount$ = this.peopleService.getDeathCount().pipe();
    this.mateCount$ = this.peopleService.getMateCount().pipe();
    this.worldPeopleCount$ = this.worldService.getPeopleCount().pipe();
    this.currentDate$ = this.worldService.getCurrentDate().pipe();
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

  seedPeople(ammount: number): any[]{
    this.peopleService.getSeedPeople(ammount).subscribe(x => {
      return x;
    });
    return [];
  }

}
