import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ToastrModule} from 'ngx-toastr';
import { StoreRouterConnectingModule,RouterStateSerializer } from '@ngrx/router-store';
import { AppComponent } from './app.component';
import { AppRouterModule } from './app-routing.module';
import { SharedModule,CustomRouterStateSerializer } from '@totobo/shared';
import { reducers, metaReducers } from './reducers';
import { CoreModule } from '@totobo/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      progressAnimation: 'increasing'
    }),
    SharedModule,
    CoreModule,
    AppRouterModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers,runtimeChecks: {
      strictActionImmutability: true,
      strictStateImmutability: true,
    } }),
    EffectsModule.forRoot()
  ],
  providers: [{provide:RouterStateSerializer,useClass:CustomRouterStateSerializer}],
  bootstrap: [AppComponent],
})
export class AppModule {}
