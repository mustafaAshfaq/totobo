import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import {RouterStateUrl} from '@totobo/shared';

export interface AppState {
  router:RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<AppState> = {
  router:routerReducer
};

export const logger=(reducer:ActionReducer<AppState>):ActionReducer<AppState,Action>=>{
    return function(state:AppState,action:Action):AppState{
      return reducer(state,action);
    }
}


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [logger];
