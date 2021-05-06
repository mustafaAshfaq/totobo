import {Injectable, OnDestroy} from '@angular/core'
import {CanLoad, Route, UrlSegment,Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AuthFacade,AuthActions,AuthEntity,AuthFeature,AuthSelectors} from '@totobosports-new/auth';
import { Store } from '@ngrx/store';
@Injectable()
export class AuthGuard implements CanLoad,OnDestroy{
    subscription:Subscription;
    isAuthenticated:boolean;
    constructor(private router:Router
        ,private authHelper:AuthFacade
        ,private store:Store<AuthFeature.AuthPartialState>
        ){}
    canLoad(route:Route,segments:UrlSegment[]):boolean|Observable<boolean>|Promise<boolean>{
        this.subscription= this.authHelper.authenticated$//this.store.select(getAuthenticated)
        .subscribe(authenticated=>{
            this.isAuthenticated=authenticated;
            console.log('auth'+authenticated);
            if(!authenticated){
                this.router.navigate(['/auth/login'],{
                    queryParams:{returnUrl:route.path===''?'/home':route.path}
                })
            }

        })
        // let loggedIn=localStorage.getItem('loggedIn');
        // this.isAuthenticated=loggedIn && loggedIn==='true';
        // if(this.isAuthenticated){
        //     this.store.dispatch( AuthActions.loginSuccess( { } as  AuthEntity))
        // }
        // else{
        //     console.log('path:'+route.path)
        //             this.router.navigate(['account','login'],{
        //                 queryParams:{returnUrl:route.path===''?'/':route.path}
        //             })
        //         }
        return this.isAuthenticated;
    }
    ngOnDestroy(){
        if(this.subscription)
            this.subscription.unsubscribe();
    }
}
