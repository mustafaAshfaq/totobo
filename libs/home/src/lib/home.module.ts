import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@totobo/shared';
import { RouterModule,  Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatchComponent } from './match/match.component';

export const homeRoutes: Routes = [
  {
    path:'matches',component:HomeComponent
    ,children:[
      {path:':sport',component:MatchComponent,outlet:'sport'},
    ]
 }
 ,{path:'',redirectTo:'matches',pathMatch:'full'}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(homeRoutes),SharedModule],
  declarations: [HomeComponent, MatchComponent]
})
export class HomeModule {}
