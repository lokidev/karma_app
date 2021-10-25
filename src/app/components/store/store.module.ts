import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyStoreComponent } from './store.component';
import { StoreModule } from '@ngrx/store';
import * as fromScoreboard from 'src/app/components/store/reducers/game.reducer';
import * as fromRoster from 'src/app/components/store/reducers/team.reducer';
import * as fromKarma from 'src/app/components/store/reducers/karma.reducer';

@NgModule({
  declarations: [MyStoreComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromScoreboard.scoreboardFeatureKey, fromScoreboard.reducer),
    StoreModule.forFeature(fromRoster.rosterFeatureKey, fromRoster.reducer),
    StoreModule.forFeature(fromKarma.karmaFeatureKey, fromKarma.reducer)
  ]
})
export class MyStoreModule { }
