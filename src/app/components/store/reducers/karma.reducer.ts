import { Action, createReducer, on } from '@ngrx/store';
import * as KarmaPageActions from '../actions/karma.actions';

export const karmaFeatureKey = 'karma';

export interface State {
  currDate: Date;
}

export const initialState: State = {
  currDate: new Date(),
}

const scoreboardReducer = createReducer(
  initialState,
  //on(KarmaPageActions.setWorldTime, state => ({ ...state, currDate: state.currDate + 1 })),
  on(KarmaPageActions.setWorldTime, (state, { worldTime }) => ({ currDate: worldTime.currDate }))
)

export function reducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action);
}
