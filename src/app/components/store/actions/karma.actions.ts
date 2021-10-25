import { createAction, props } from '@ngrx/store';
import { WorldTime } from '../models/worldTime.model';

//export const setWorldTime = createAction('[Karma Page] World Time');
export const setWorldTime = createAction('[Karma Page] Get World Time', props<{ worldTime: WorldTime }>());
