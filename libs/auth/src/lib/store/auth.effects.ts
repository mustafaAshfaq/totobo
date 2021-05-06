import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import {Observable,of} from 'rxjs'
import {map,exhaustMap,catchError} from 'rxjs/operators'
import {AuthEntity} from './auth.models'
import * as AuthFeature from './auth.reducer';
import * as AuthActions from './auth.actions';
import {AuthService} from '../../../../core/src/services/auth/auth.service'; //'@totobo/core';

@Injectable()
export class AuthEffects {
//  init$ = createEffect(() => this.dataPersistence.fetch(AuthActions.login, {
//     run:  (action: ReturnType<typeof AuthActions.login>, state: AuthFeature.AuthPartialState) => {
//       // Your custom service 'load' logic goes here. For now just return a success action...
//       return AuthActions.loginSuccess( {
//         auth:{id:1
//         ,first_name:'abc'
//         ,last_name:'def'
//         ,token:'sdsd'
//         ,email:'ss@op.com'}
//       });
//       // of(true).pipe(map(_=>AuthActions.loginSuccess( {
//       //   auth:{id:1
//       //   ,first_name:'abc'
//       //   ,last_name:'def'
//       //   ,token:'sdsd'
//       //   ,email:'ss@op.com'}
//       // })))

//     },

//     onError: (action: ReturnType<typeof AuthActions.login>, error) => {
//       console.error('Error', error);
//       return AuthActions.loginFailure({ error });
//     }
//   }));

login$ = createEffect(() =>
this.actions$.pipe(
  ofType(AuthActions.login),
  map((action) => action),
  exhaustMap((auth) =>
    //of(AuthActions.loginSuccess(null))
    this.authService.login(auth).pipe(
      map((user) => AuthActions.loginSuccess(user as AuthEntity)),
      catchError((error) => of(AuthActions.loginFailure({ error })))
    )

  )
)
);

  logout$=createEffect(()=>this.actions$.pipe(
    ofType(AuthActions.logout)
    ,map(_=>{return AuthActions.logoutSuccess({loggedOut:true})})
    ))


 constructor(
   private actions$: Actions,
   private dataPersistence: DataPersistence<AuthFeature.AuthPartialState>,
   private authService:AuthService
  ) { }
}
