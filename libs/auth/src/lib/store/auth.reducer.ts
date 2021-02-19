import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AuthActions from './auth.actions';
import { AuthEntity } from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface State extends EntityState<AuthEntity> {
  authenticated: boolean; // is user authenticated
  error?: string | null; // last known error (if any)
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const authAdapter: EntityAdapter<AuthEntity> = createEntityAdapter<AuthEntity>({
  selectId:(user:AuthEntity)=>user.id?.toString(),
  sortComparer:false
});

export const initialState: State = authAdapter.getInitialState({
  // set initial required properties
  authenticated: false,
});

const authReducer = createReducer(
  initialState,
  //on(AuthActions.logout, (state) => ({ ...state, authenticated: false, error: null })),
  on(AuthActions.logoutSuccess, (state,{loggedOut}) => (
    { ...state, authenticated: !loggedOut, error: null })),
  on(AuthActions.loginSuccess, (state, auth) =>authAdapter
    .setOne(auth, { ...state, authenticated: true })
  ),
  on(AuthActions.loginFailure, (state, { error }) =>  ({ ...state, error:error}))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
