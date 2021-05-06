import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BetsService } from 'libs/core/src/services/bets-service';
import { Match } from 'libs/core/src/models/match.model';
import { from, Observable, of } from 'rxjs';
import {map,switchMap, mergeMap, catchError, toArray} from 'rxjs/operators';
import { getSportEnumByValue, LiveSportEvent, SportsEnum } from 'libs/shared/src/dto';
import { WeekDays } from 'libs/core/src/models';
@Component({
  selector: 'totobo-prematchlist',
  templateUrl: './prematchlist.component.html',
  styleUrls: ['./prematchlist.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PrematchlistComponent implements OnInit,OnChanges {

  constructor(private betsService:BetsService) { }
  preMatchList$:Observable<any>
  @Input() sportId:number;
  @Input() hours:number=12;

  @Input()countryCode:string;
  ngOnInit(): void {
    this.preMatchList$= this.betsService.getUpcomingEventsBySport(this.sportId.toString(),this.hours.toString())
    .pipe(
       map(s=>s.filter(m=>//Math.floor(((new Date(+(m.time)*1000).getTime()- new Date().getTime())/1000)/60)<=720 &&
       new Date(+(m.time)*1000).getTime()> new Date().getTime()&&
                 this.filterEsport(m)
                && (!this.countryCode || this.countryCode.trim().length<0|| !m.league ||m.league.cc===this.countryCode))
      .slice(0,(s?.length>=8?8:s?.length)))
      ,switchMap(ue=>from(ue).pipe(
        mergeMap((mo:any)=>this.betsService.getEventOdds(mo.id)
          .pipe(map(mos=>({odds:mos.odds, ...mo}))))
          ,catchError(err=>{
               console.log('error geting live matches:'+JSON.stringify(err));
               return of(null);
             })
        ,toArray())
      )

    );
    //this.preMatchList$.subscribe(pm=>console.log(pm))
  }
  ngOnChanges(changes:SimpleChanges){
    if(changes.sportId.previousValue){
      let sportObservables:Observable<any>;
      if(changes.sportId.currentValue>0)
        sportObservables= this.betsService.getUpcomingEventsBySport(this.sportId.toString(),this.hours.toString());
      else if(changes.sportId.currentValue===-1)//get all sport today
      {
        let dateObj= new Date(Date.now());
        let dateStr=dateObj.getFullYear().toString()+dateObj.getMonth().toString()+dateObj.getDate().toString()
        sportObservables=this.betsService.getUpcomingEvents('', dateStr,this.countryCode).pipe(switchMap(m=>from(m)));
      }
      else if(changes.sportId.currentValue===-2){
        this.betsService.getUpcomingEvents('').pipe(switchMap(m=>from(m)));
      }
      this.preMatchList$=sportObservables//this.betsService.getUpcomingEventsBySport(changes.sportId.currentValue)
      .pipe(
        map(s=>s.filter(m=>//Math.floor(((new Date(+(m.time)*1000).getTime()- new Date().getTime())/1000)/60)<=720&&
        new Date(+(m.time)*1000).getTime()> new Date().getTime()&&
        this.filterEsport(m)
        && (!this.countryCode || this.countryCode.trim().length<0|| !m.league ||m.league.cc===(changes.countryCode.currentValue??this.countryCode)))
        .slice(0,(s?.length>=8?8:s?.length)))
        ,switchMap(ue=>from(ue).pipe(
          mergeMap((mo:any)=>this.betsService.getEventOdds(mo.id)
            .pipe(map(mos=>({odds:mos.odds, ...mo}))))
            ,catchError(err=>{
                console.log('error geting live matches:'+JSON.stringify(err));
                return of(null);
              })
          ,toArray())
        )

      );
    }


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

  localMatchDate(time){
    let matchDate= new Date(0);
    matchDate.setUTCSeconds(+(time));
    return matchDate;
  }
  timeDetails(time){
     let matchDate= new Date(+(time)*1000);//this.localMatchDate(time);
    // var tempDate=new Date(+(time)*1000).getTime();
    let timeDiff= Math.floor(((new Date(+(time)*1000).getTime()- new Date().getTime())/1000)/60)

    if(timeDiff>50)
      return matchDate.getHours()+':'+matchDate.getMinutes()
    else
      return timeDiff.toString()+' min';
    //return  Math.floor(((this.localMatchDate(time).getTime()- new Date().getTime())/1000)/60);
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
}
