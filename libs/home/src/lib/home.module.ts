import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';
import { MatchComponent } from './components/match/match.component';
import {MatchDetailsComponent} from './components/match/components/match-details/match-details.component'
import { SharedModule } from '@totobosports-new/shared';
import {LayoutModule} from '@totobosports-new/layout';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
       {path:'matches',component:HomeComponent
       ,children:[
         {path:':sport',component:MatchComponent,outlet:'sport'},
       ]
    }
    ,{path:'',redirectTo:'matches',pathMatch:'full'}
    ]),
    SharedModule,
    LayoutModule
  ],
  declarations: [HomeComponent,MatchComponent,MatchDetailsComponent,RangeSliderComponent],
})
export class HomeModule {}
