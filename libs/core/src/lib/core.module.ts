import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { BetsService } from '../services/bets-service';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth/auth.service';
@NgModule({
  imports: [CommonModule,HttpClientModule],
  providers:[BetsService
    ,AuthGuard,AuthService
  ,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor, multi:true}
  ]
})
export class CoreModule {}
