import {ActionReducerMap,ActionReducer,Action,MetaReducer} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';
import {AppState} from '../state'
import { environment } from 'apps/web/src/environments/environment';

export const reducer:ActionReducerMap<AppState>={
    router:routerReducer
}

export const logger=(reducer:ActionReducer<AppState>):ActionReducer<AppState,Action>=>{
    return function(state:AppState,action:Action):AppState{
        return reducer(state,action);
    }
}

export const metaReducer:MetaReducer<AppState>[]=environment.production?[logger]:[];