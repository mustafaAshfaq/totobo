import {RouterReducerState} from '@ngrx/router-store';
import {RouterStateUrl} from '@totobosports-new/shared';

export interface AppState{
    router:RouterReducerState<RouterStateUrl>
}