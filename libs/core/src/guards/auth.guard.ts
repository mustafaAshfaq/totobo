import {Injectable, OnDestroy} from '@angular/core'
import {CanLoad, Route, UrlSegment,Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AuthFacade} from '@totobo/auth';
@Injectable()
export class AuthGuard implements CanLoad,OnDestroy{
    subscription:Subscription;
    constructor(private router:Router,private authHelper:AuthFacade){}
    canLoad(route:Route,segments:UrlSegment[]):boolean|Observable<boolean>|Promise<boolean>{
        this.subscription=this.authHelper.authenticated$.subscribe(authenticated=>{
            if(!authenticated){
                this.router.navigate(['/account/login'],{
                    queryParams:{returnUrl:route.path===''?'/':route.path}
                })
            }
           
        })
       
        return this.authHelper.authenticated$;
    }
    ngOnDestroy(){
        if(this.subscription)
            this.subscription.unsubscribe();
    }
}