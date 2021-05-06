import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router'
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../apps/web/src/app/store/state';
import {BetsService} from '@totobosports-new/core'
import {layoutsQuery} from '@totobosports-new/layout'
import { map } from 'rxjs/operators';
import { getSportEnumByValue, LiveSportEvent, SportsEnum } from '@totobosports-new/shared';
@Component({
  selector: 'totobosports-new-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private betsService:BetsService,private store:Store<AppState>
    ,private router:Router
    ,private route:ActivatedRoute) { }
   layout$:Observable<any>
   sports$:Observable<any>;
   sportIdSelected:number;
   liveSportIdSelected:number;
   upcomingSportIdSelected:number=1;
   distinctSportsUpcoming;//:Observable<{sportId,sportName}[]>
  ngOnInit(): void {
    this.sportIdSelected=0;
    this.liveSportIdSelected=1;
    this.layout$=this.store.select(layoutsQuery.getLayout);
    setTimeout(()=>{
      this.betsService.onBetDurationChange(86400);
    },2000)
    this.sports$=this.betsService.sports;
    this.navigateToSport(1);
  }

  getIcon(sport:any){
    let sportIcon="fa fa-trophy";
   switch(+(sport[0]?.sport_id))
    {
      case 1:
       sportIcon="fa fa-futbol"
      break;
      case 8:
      case 12:
      case 19:
      case 36:
        sportIcon="fa fa-football-ball"
      break;
      case 18:
        sportIcon="fa fa-basketball-ball"
      break;
      case 16:
        sportIcon="fa fa-baseball-ball"
      break;
      case 5:
        sportIcon="fa fa-tennis"
      break;
      case 92:
        sportIcon="fa fa-table-tennis"
      break;
      case 91:
      case 95:
        sportIcon="fa fa-volleyball-ball"
      break;

    }
    return `${sportIcon}`;
  }

  public getName(id){
   return SportsEnum[id];
  }


  navigateToSport(sport){
    this.router.navigate([
      { outlets:
       {
           sport:[sport]
       }
   }],{relativeTo:this.route}
   );
  }

}
