import { Component,OnInit,OnDestroy, HostListener,Inject,PLATFORM_ID } from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Router,NavigationEnd} from '@angular/router'
import {Meta,Title} from '@angular/platform-browser'
import {Store} from '@ngrx/store';
import {Observable,Subscription} from 'rxjs'
import {filter} from 'rxjs/operators'
import {AppState} from './store/state';
import {layoutsQuery,LayoutsLoaded,Entity as Layouts} from '@totobosports-new/layout';
import {environment} from '../environments/environment'
@Component({
  selector: 'totobosports-new-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host:{
    '(window:resize)':'onResize(event$)'
  }
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'web';
  layout$:Observable<Layouts>
  subscriptions:Subscription[]=[];
  currentUrl:string;
  schema:{};
  constructor(private store:Store<AppState>,@Inject(PLATFORM_ID) private platformId
  ,private router:Router
  ,private meta:Meta
  ,private metaTitle:Title
  ){
    this.router.events.pipe(filter(e=>e instanceof NavigationEnd))
    .subscribe((e:NavigationEnd)=>{
      this.currentUrl=e.url;
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    })
  }
  ngOnInit(){
    this.addMetaInfo();
    this.schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: environment.appName,
      url: isPlatformBrowser(this.platformId) ? location.origin : ''
    };
    this.addFaviconIcon();
    this.addConstMetaInfo();
    this.layout$=this.store.select(layoutsQuery.getLayout);
    this.setLayout({isMobile:isPlatformBrowser(this.platformId)? window.innerWidth<990:false
      ,showMobileSearchBar:false,showMobileMainMenu:false});
  }
  ngOnDestroy(){
    if(this.subscriptions)
      this.subscriptions.forEach(s=>{if(s)s.unsubscribe();});
  }
  private addConstMetaInfo() {
    const metaInfo = environment.config.metaInfo;
    this.meta.updateTag({
      name: 'google-site-verification',
      content: metaInfo.googleSiteVerification
    });
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
    const metaInfo = environment.config.metaInfo;
    this.meta.updateTag({ name: 'description', content: metaInfo.description });
    this.meta.updateTag({ name: 'keywords', content: metaInfo.title });
    this.meta.updateTag({ name: 'title', content: metaInfo.title });
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
  setLayout(layout){
    this.store.dispatch( new LayoutsLoaded(layout))
  }
  @HostListener('window:resize',['$event'])
  onResize(event){
    const layout:Layouts={isMobile:false,showMobileSearchBar:false,showMobileMainMenu:false}
    if (isPlatformBrowser(this.platformId)) {
      layout.isMobile = event.target.innerWidth< 990 ;
    }
    this.setLayout(layout);
  }
}
