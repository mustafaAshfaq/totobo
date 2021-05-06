import { Component, OnInit, ChangeDetectionStrategy,Input,Inject, OnChanges, PLATFORM_ID, OnDestroy} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs';
import { IUserEntity } from '@totobosports-new/shared';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../../apps/web/src/app/store/state';
import { AuthActions } from '@totobosports-new/auth';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderProfileComponent implements OnInit,OnChanges,OnDestroy {
  @Input() isAuthenticated;
  public name: string;
  @Input() isMobile;
  currentUser: IUserEntity;
  subnav: boolean;
  isOpen: boolean;
  subList$: Array<Subscription> = [];
  isScrolled: false;

    public onOpenChange(event){
        this.isOpen=!this.isOpen;
    }
    public login(){
      this.router.navigate(['auth/login']);
    }
    public logout(){
      isPlatformBrowser(this.platformId)
        localStorage.clear();
      this.store.dispatch( AuthActions.logout());
      this.router.navigate(['auth/login']);
    }
    ngOnInit(){
    }
    ngOnChanges(){
      this.currentUser = isPlatformBrowser(this.platformId)
        ? JSON.parse(localStorage.getItem('user'))
        : null;
      if (this.currentUser) {
        this.name = this.currentUser.firstName;
      }
    }
    ngOnDestroy(){
        this.subList$.map(sub$=>sub$.unsubscribe());
    }
constructor(  private store:Store<AppState>,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any){}


}
