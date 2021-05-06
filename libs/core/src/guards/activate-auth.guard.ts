import { Subscription, Observable } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
//import {AuthFacade} from '@totobo/auth'

@Injectable({providedIn:'root'})
export class CanActivateViaAuthGuard implements CanActivate, OnDestroy {
  isAuthenticated: boolean;
  subscription: Subscription;

  constructor(//private authHelper:AuthFacade, 
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // this.subscription = this.authHelper.authenticated$
    //   //.select(getAuthStatus)
    //   .subscribe(isAuthenticated => {
    //     this.isAuthenticated = isAuthenticated;
    //     if (!isAuthenticated) {
    //       this.router.navigate(['/account/login'], {
    //         queryParams: { returnUrl: state.url }
    //       });
    //     }
    //   });

    return this.isAuthenticated;
  }

  ngOnDestroy() {
      if(this.subscription)
    this.subscription.unsubscribe();
  }
}
