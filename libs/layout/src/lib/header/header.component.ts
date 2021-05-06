import { Component, Input, OnInit,PLATFORM_ID,Renderer2,Inject,HostListener } from '@angular/core';
import {Location,isPlatformBrowser} from '@angular/common';
import {Router,NavigationEnd} from '@angular/router'
import {Store} from '@ngrx/store'
import {Observable,of} from 'rxjs'
import {filter} from 'rxjs/operators'
import {Entity as layout} from '../store/layouts.reducer'
import {AppState} from '../../../../../apps/web/src/app/store/state';
import {environment} from '../../../../../apps/web/src/environments/environment'
import {AuthFacade} from '@totobosports-new/auth'
import {layoutsQuery} from '../store/layouts.selectors';
import {LayoutsState} from '../store/layouts.reducer'
@Component({
  selector: 'totobosports-new-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host:{
    '(window:scroll)':'updateHeader($event)'
  }
})
export class HeaderComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId
  ,private router:Router
  ,private store:Store<AppState>
  ,private location:Location
  ,private renderer:Renderer2
  ,private authHelper:AuthFacade) {
    this.logoUrl=location.prepareExternalUrl(this.logoUrl);
   }
  layoutState$:Observable<layout>;
  currentUrl:string
  public isScrolled:boolean;
  public localTime:string
  public freeShippingAmount = environment.config.freeShippingAmount;
  public currency = environment.config.currency_symbol;
  public logoUrl:string=environment.config.header.brand.logo;
  public logoText:string=environment.config.header.brand.name;
  public logoWidth:string=environment.config.header.brand.width;
  public logoHeight:string=environment.config.header.brand.height;
  public screenwidth:any;
  public isAuthenticated$: Observable<boolean>;
  public user$: Observable<any>;
    public scrollPos = {
        currPos: 0,
        startPos: 0,
        changePos: 5
      };

    public isSearchOpen:boolean=true;
    public isMobile:boolean;
    public isModalShown = false;
    public headerConfig = environment.config.header;
    public config = { backdrop: false, ignoreBackdropClick: false };
  ngOnInit(): void {
    this.router.events.pipe(filter(e=>e instanceof NavigationEnd))
    .subscribe((e:NavigationEnd)=>{
      this.currentUrl=e.url;
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    })
    this.layoutState$=this.store.select(layoutsQuery.getLayout);
    this.layoutState$.subscribe(la=> { this.isMobile=la.isMobile; this.isScrolled=!la.isMobile;});

    if (isPlatformBrowser(this.platformId)) {
      if (this.isSearchOpen) {
        this.renderer.addClass(document.body, 'issearchopen');
      } else {
        this.renderer.removeClass(document.body, 'issearchopen');
      }
    }

    if (isPlatformBrowser(this.platformId)) {
      this.screenwidth = window.innerWidth;
    }

    this.isAuthenticated$=this.authHelper.authenticated$;

  }

  @HostListener('window:scroll',['$event'])
  updateHeader($event) {
      if (isPlatformBrowser(this.platformId)) {
        if (this.screenwidth >= 990) {
          this.scrollPos.currPos =
            (window.pageYOffset || $event.target.scrollTop) -
            ($event.target.clientTop || 0);
          if (
            this.scrollPos.currPos >= this.scrollPos.changePos &&
            window.pageYOffset >= 90
          ) {
            this.isScrolled = true;
          } else {
            this.isScrolled = false;
          }
        }
      }
    }

    public showModal(): void {
      this.isModalShown = !this.isModalShown;
      this.isSearchOpen = !this.isSearchOpen;
      if (isPlatformBrowser(this.platformId)) {
        if (this.isModalShown) {
          this.renderer.addClass(document.body, 'isModalShown');
        } else {
          this.renderer.removeClass(document.body, 'isModalShown');
        }
        if (this.isSearchOpen) {
          this.renderer.addClass(document.body, 'issearchopen');
        } else {
          this.renderer.removeClass(document.body, 'issearchopen');
        }
      }
    }
    public childCatLoaded(status) {
      this.isModalShown = status;
      this.isSearchOpen = !status;
    }
    onHidden(): void {
      this.isModalShown = false;
    }
    allmenuClosed(status) {
      this.isModalShown = status;
      this.isSearchOpen = !status;
      if (isPlatformBrowser(this.platformId)) {
        if (this.isSearchOpen) {
          this.renderer.addClass(document.body, 'issearchopen');
        } else {
          this.renderer.removeClass(document.body, 'issearchopen');
        }
      }
    }
    public isActive(link:string):boolean{
      if(link==='home')
       return this.currentUrl.trim()==='/' || this.currentUrl.substr(1).toUpperCase().trim()==='HOME';
      else
        return link.toUpperCase().trim()===this.currentUrl.substr(1).toUpperCase().trim()
    }
}
