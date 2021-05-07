import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import {ToastrModule} from 'ngx-toastr';
import { CustomRouterStateSerializer, SharedModule } from '@totobosports-new/shared';
import {LayoutModule} from '@totobosports-new/layout';
import {AuthGuard, CoreModule} from '@totobosports-new/core';
import { metaReducer, reducer } from './store/reducers';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AppPreloadingStrategy } from './app-preloading-strategy';
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'
@NgModule({
  declarations: [AppComponent],
  imports: [

    RouterModule.forRoot(
      [
        { path: '', pathMatch: 'full', redirectTo: 'home' },
        {
          path: 'home',
          loadChildren: () =>
            import('@totobosports-new/home').then(
              (module) => module.HomeModule
            ),
            canLoad:[AuthGuard]
        },
        {
          path: 'auth',
          loadChildren: () =>
            import('@totobosports-new/auth').then(
              (module) => module.AuthModule
            ),
        },
      ],
      {
        initialNavigation: 'enabled',
        preloadingStrategy: AppPreloadingStrategy,
      }
    ),
    BrowserModule,BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(
      reducer,
      {
        metaReducers: !environment.production ? [] : metaReducer,
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
   // !environment.production ? StoreDevtoolsModule.instrument() : [],
   ToastrModule.forRoot({
    timeOut: 1500,
    positionClass: 'toast-top-center',
    preventDuplicates: true,
    progressAnimation: 'increasing'
  }),
    StoreRouterConnectingModule.forRoot(),
    NgProgressModule,NgProgressHttpModule,
    SharedModule,LayoutModule,CoreModule
  ],
  providers: [{provide:RouterStateSerializer,useClass:CustomRouterStateSerializer},AppPreloadingStrategy],
  bootstrap: [AppComponent],
})
export class AppModule {}
