import {Injectable,PLATFORM_ID,Inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {HttpEvent, HttpInterceptor,HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../apps/web/src/environments/environment';
@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    constructor(@Inject(PLATFORM_ID) private platformId:Object){}
    public intercept(
        request:HttpRequest<any>
        ,next:HttpHandler
    ):Observable<HttpEvent<any>>{
        let cloneReq= request.clone({
            headers: new HttpHeaders({
                'Content-Type':'application/json'
                ,Authorization:`Bearer ${this.getUserToken()}`
                ,Accept:'*/*'
            })
            //,url:this.fixUrl(request.url)
        });
        return next.handle(cloneReq);
    }
    private fixUrl(url: string) {
        if (url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
          return url;
        } else {
          return environment.apiEndpoint + url;
        }
      }
    private getUserToken()
    {
        if(isPlatformBrowser(this.platformId)){
            const user = JSON.parse(localStorage.getItem('user'));
            
            return user ? user.token : null;
        }
        else 
            return null;
    }
}