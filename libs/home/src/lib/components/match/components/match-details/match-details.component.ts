import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BetsService } from '@totobosports-new/core';
import { Match } from 'libs/core/src/models/match.model';
import {LiveSportEvent,SportOdds,SportsEnum,getSportEnumByValue} from '@totobosports-new/shared'
import { Observable ,Subscription} from 'rxjs';

@Component({
  selector: 'totobo-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss']
})
export class MatchDetailsComponent implements OnInit,OnDestroy {

  constructor(private betsService:BetsService) { }
  @Input()match:LiveSportEvent;
  odds$:Observable<any>
  sportOdds:SportOdds[];
  subscriptions:Subscription[]=[]
  get matchStatus(){
    let keys=Object.values(SportsEnum);

    switch(getSportEnumByValue(this.match.sport_id)){
      case SportsEnum.SOCCER:
        if(this.match.timer){
          if(this.match.timer.md===1 && this.match.timer.ts===0 && this.match.timer.tm===45)
            return "Half Time"
          else if(this.match.timer.tm<=45)
            return this.match.timer.tm+'\''
          else if(this.match.timer.tm>=45)
            return this.match.timer.tm+'\''
        }
      case SportsEnum.BASKETBALL:
        if(this.match.timer){
          if(this.match.timer?.q)
            return this.match.timer?.q+" Quarter -"+this.match.timer?.tm
        }
        case SportsEnum.VOLLEYBALL:
        case SportsEnum.TABLE_TENNIS:
        case SportsEnum.TENNIS:
          if(this.match.scores){
            let scoreKeys=Object.keys(this.match.scores);
            if(scoreKeys&& scoreKeys.length>0)
              return scoreKeys.length+"- Set";
          }
    }
   return "Live Now"
  }
   public matchScore(home:boolean){
    let score:string=this.match.ss;
    if(getSportEnumByValue(this.match.sport_id)=== SportsEnum.TENNIS)
      score=this.match.points;
    if(score){
      if(home)
        return score.split('-')[0];
      else
        return score.split('-')[1];
    }
   }

  ngOnInit(): void {
    //this.betService.getMatchDetail(this.matchId)
    this.odds$=this.betsService.getEventOdds(this.match.id);
    if(this.odds$)
      this.subscriptions.push(this.odds$.subscribe(od=>this.sportOdds=od.odds[`${this.match.sport_id}_1`]));

  }
  ngOnDestroy(){
    if(this.subscriptions)
      this.subscriptions.forEach(s=>{if(s)s.unsubscribe();})
  }

}
