import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as AuthFeature from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

@Injectable({
  providedIn:'root'
})
export class AuthFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  authenticated$ = this.store.pipe(select(AuthSelectors.getAuthenticated));
  allAuth$ = this.store.pipe(select(AuthSelectors.getAllAuth));
  selectedAuth$ = this.store.pipe(select(AuthSelectors.getSelected));
  errors$=this.store.pipe(select(AuthSelectors.getAuthError));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  logout(){
    this.store.dispatch(AuthActions.logout())
  }
  init(creds:{username,password}) {
    this.store.dispatch(
      
      AuthActions.login(creds)
      );
  }
}
