import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import {isPlatformBrowser} from '@angular/common'
import { Observable, Subscription } from 'rxjs';
import {filter, map} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import {environment} from '../environments/environment';
import {AuthFacade} from '@totobo/auth';
import { BetsService } from '@totobo/core';
@Component({
  selector: 'totobo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'bahis-ui';
  currentUrl:string;
  spinner:boolean;
  schema:{};
  subscriptionList$:Array<Subscription>=[];
  sports:[];
  showAll:boolean=false;
  loggedIn$:Observable<boolean>
  constructor(@Inject(PLATFORM_ID) private platformId:Object
  ,private router:Router
  ,private metaTitle:Title
  ,private meta:Meta
  ,private authHelper:AuthFacade
  ,private sportService:BetsService
  ){
    this.schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'environment.appName',
      url: isPlatformBrowser(this.platformId) ? location.origin : ''
    };
  }
  ngOnInit(){
    this.subscriptionList$.push(this.router.events
    .pipe(filter(e=> e instanceof NavigationEnd))
    .subscribe((e:NavigationEnd)=>{
      this.currentUrl=e.url;
      if(isPlatformBrowser(this.platformId))
        window.scrollTo(0,0);
      this.addMetaInfo();
    }));
   this.addFaviconIcon();
    this.loggedIn$=this.authHelper.authenticated$;
    this.loggedIn$.subscribe(a=>{
      if(a){
        this.sportService.onBetDurationChange(86400);
        // this.sports$=this.sportService.sports.pipe(
        //   map(data=>data.filter(d=>d.MatchCountPre>0).sort((s1,s2)=>s1.SportID-s2.SportID)))
      }
      
    });
    this.sportService.sports.subscribe(d=>this.sports=d);
  }
  private addFaviconIcon() {
    if (isPlatformBrowser(this.platformId)) {
      const link = (document.querySelector(`link[rel*='icon']`) ||
        document.createElement('link')) as HTMLLinkElement;
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = environment.config.fevicon;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }
  addMetaInfo(){
    let metaInfo= environment.config.metaInfo;
    this.meta.updateTag({name:'title',content:metaInfo.title});
    this.meta.updateTag({name:'description',content:metaInfo.description});
    this.meta.updateTag({name:'keywords',content:metaInfo.title});

    this.meta.updateTag({
      name: 'apple-mobile-web-app-title',
      content: environment.appName
    });
    this.meta.updateTag({
      property: 'og:description',
      content: metaInfo.description
    });
    this.meta.updateTag({
      property: 'og:url',
      content: environment.config.frontEndUrl
    });
    this.meta.updateTag({
      property: 'twitter:title',
      content: metaInfo.description
    });
    this.metaTitle.setTitle(metaInfo.title);
  }
  getIcon(sport:any){
    let sportIcon="fi fi-rr-badge";
   switch(sport?.Sport)
    {
      case 'Futbol':
      case 'E Futbol':
      case 'Salon Futbolu':
       sportIcon="fa fa-soccer-ball-o"
      break;
      case 'Amerikan Futbolu':
      case 'Avustralya Futbolu':
      case 'Ragbi':
        sportIcon="fi fi-rr-rugby"
      break;
      case 'Basketbol':
        sportIcon="fi fi-rr-basketball"
      break;
      case 'Tenis':
        sportIcon="fi fi-rr-tennis"
      break;
      case 'Masa Tenisi':
        sportIcon="fi fi-rr-ping-pong"
      break;
      case 'Voleybol':
        sportIcon="fi fi-rr-volleyball"
      break;
     
    }
    return `${sportIcon}`;
  }
  ngOnDestroy(){
  if(this.subscriptionList$)
        this.subscriptionList$.forEach(sub=>{
          if(sub) sub.unsubscribe();
        });
  }
}
