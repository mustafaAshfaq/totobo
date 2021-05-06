import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import {combineLatest, forkJoin, from, Observable, of} from 'rxjs'
import {BetsService, match} from '@totobosports-new/core'
import { catchError, concatMap, filter, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import {SportsEnum,LiveSportEvent,getSportEnumByValue, SportOdds} from '@totobosports-new/shared'
@Component({
  selector: 'totobo-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  constructor(private route:ActivatedRoute,private betService:BetsService) { }
  matches$:Observable<LiveSportEvent[]>
  _sportId;
  odds$:Observable<any>
  odds1$;
  matchesWithOdds$:Observable<any>;
  oddsCalls:any[]=[]
  //sportHeader$;
  sportBetHeader():string{
    switch(+(this._sportId)){
      case SportsEnum.SOCCER:
        return "Goals From Now +/-";
      case SportsEnum.TENNIS:
      case SportsEnum.VOLLEYBALL:
        return "Set 1 2";
      case SportsEnum.BASKETBALL:
        return "Points overall +/-";
      default:
        return "something"
    }

  }
  sportScoreHeader(){
    switch(+(this._sportId)){
      case SportsEnum.SOCCER:
        return "";
      case SportsEnum.TENNIS:
        return "Set Score";
      case SportsEnum.BASKETBALL:
        return "";
      default:
        return ""
    }
  }
  public  matchStatus(match){
    if(!match)
    return '';
    let keys=Object.values(SportsEnum);
    switch(getSportEnumByValue(match.sport_id)){

      case SportsEnum.SOCCER:
        if(match.timer){
          if(match.timer.md===1 && match.timer.ts===0 && match.timer.tm===45)
            return "Half Time"
          else if(match.timer.tm<=45)
            return match.timer.tm+'\''
          else if(match.timer.tm>=45)
            return match.timer.tm+'\''
        }
      case SportsEnum.BASKETBALL:
        if(match.timer){
          if(match.timer?.q)
            return match.timer?.q+" Quarter -"+match.timer?.tm
        }
        case SportsEnum.VOLLEYBALL:
        case SportsEnum.TABLE_TENNIS:
        case SportsEnum.TENNIS:
          if(match.scores){
            let scoreKeys=Object.keys(match.scores);
            if(scoreKeys&& scoreKeys.length>0)
              return scoreKeys.length+"- Set";
          }
    }
   return "Live Now"
  }
  ngOnInit(): void {
   this.matchesWithOdds$=this.route.paramMap.pipe(
        map((p:Params)=>p.get('sport'))
       ,switchMap(m=>this.betService.getLiveMatches(Number(m))
          .pipe(
              map(d=>d.filter(md=>this.filterEsport(md)).slice(0,(d?.length>=8?8:d?.length)))
              ,switchMap(m=>from(m)),filter(m=>this.filterEsport(m))
                ,mergeMap(mo=>this.betService.getEventOdds(mo.id)
                  .pipe(map(mos=>({odds:mos.odds, ...mo}))))
                  ,catchError(err=>{
                           console.log('error geting live matches:'+JSON.stringify(err));
                           return of(null);
                         })
              ,catchError(err=>{
                  console.log('error geting live matches:'+JSON.stringify(err));
                                 return of(null);
                })
         ,toArray() )
      )

    );
    this.route.paramMap.subscribe(p=>{this._sportId=p.get('sport')})
  }

  filterEsport(game:LiveSportEvent):boolean{
    let leagueName='',home_awayName='esports';
    switch(getSportEnumByValue(game.sport_id)){
      case SportsEnum.SOCCER:
      leagueName='esoccer';
      break;
      case SportsEnum.TENNIS:
      leagueName='etennis';
      break;
      case SportsEnum.BASKETBALL:
      leagueName='ebasketball';
      break;
      case SportsEnum.VOLLEYBALL:
        leagueName='evolleyball'
        break;
    }

    if(leagueName!=='' && game.league && game.home && game.away){
      return game.league?.name.trim().toLowerCase().indexOf(leagueName)<0
      || game.home?.name?.trim().toLowerCase().indexOf('esports')<0
      || game.away?.name?.trim().toLowerCase().indexOf('esports')<0
    }

    return true;
  }

  roundValue(value:string){
    if(value && value.trim().length>0){
      try{
         let numVal =Number.parseFloat(value)
         if(!isNaN(numVal))
          return numVal.toFixed(2).toString();
         else
          return value;
      }
      catch{
        return value;
      }
    }
  }

  public matchScore(match){
    let score:string=match.ss;
    if(getSportEnumByValue(match.sport_id)=== SportsEnum.TENNIS)
      score=match.points;
    else if(score){
        score=score.replace('-',':');
      // if(home)
      //   return score.split('-')[0];
      // else
      //   return score.split('-')[1];
    }
    return score;
   }

   public tennisSetScore(match){
     if(match.ss)
       {
          let scores=match.ss.split(',')
          if(scores && scores.length>0)
            return scores[scores.length-1];
       }
       return '';
   }

}
