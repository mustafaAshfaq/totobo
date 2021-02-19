import { createAction, props } from '@ngrx/store';
import { AuthEntity } from './auth.models';

export const logout=createAction('[Auth] Logout')

export const login = createAction('[Auth] Login'
,props<{username,password}>());

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<AuthEntity>()
);
export const logoutSuccess=createAction('[Auth/API] Logout Success'
,props<{loggedOut:boolean}>());

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: any }>()
);
