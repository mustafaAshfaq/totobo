import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { WeekDays} from 'libs/core/src/models/index'
import { BetsService } from 'libs/core/src/services/bets-service';
import { LiveSportEvent,SportOdds } from 'libs/shared/src/dto';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
@Component({
  selector: 'totobo-pre-match-details',
  templateUrl: './pre-match-details.component.html',
  styleUrls: ['./pre-match-details.component.scss']
})
export class PreMatchDetailsComponent implements OnInit,OnChanges {

  constructor(private betsService:BetsService) { }
  private _sportEvents:LiveSportEvent;
  get match():LiveSportEvent{
    return this._sportEvents
  }
  @Input() set sportEvent(val){
    this._sportEvents=val;
  }
  matchDate:Date;
  eventOdds$:Observable<any>;
  ngOnInit(): void {
    this.eventOdds$=this.betsService.getEventOdds(this.match.id).pipe(
      filter(od=> Object.keys(od).indexOf('odds')>=0//filter if there any odds
                  && Object.keys(od.odds).indexOf(this.sportObject)>=0 // odds of selected sport is there
                  && od.odds[this.sportObject]
                  && od.odds[this.sportObject]?.length>0
      )
      ,map(o=>o?.odds)
     );
    // this.betsService.getEventOdds(this.match.id).pipe(
    //    map(o=>o?.odds)).subscribe(oo=>console.log(oo));
  }
  get weekDay(){
    return this.match.time==null?null:WeekDays[this.localMatchDate.getDay()]
  }
  get localMatchDate(){
    let matchDate= new Date(0);
    matchDate.setUTCSeconds(+(this.match.time));
    return matchDate;
  }
  get timeDetails():number{

    return  Math.floor(((this.localMatchDate.getTime()- new Date().getTime())/1000)/60);
    // if(timeDiff>=60)
    //   return this.weekDay+' '+this.match.LocalMatchDate.getHours();
    // else
    // return this.weekDay+' '+ timeDiff;
  }
  get sportObject(){
    return `${this.match.sport_id}_1`;
  }
  ngOnChanges(changes){
    this._sportEvents=changes.sportEvent.currentValue;
    this.eventOdds$=this.betsService.getEventOdds(this.match.id).pipe(
      filter(od=> Object.keys(od).indexOf('odds')>=0//filter if there any odds
                  && Object.keys(od.odds).indexOf(this.sportObject)>=0 // odds of selected sport is there
                  && od.odds[this.sportObject]
                  && od.odds[this.sportObject]?.length>0
      )
      ,map(o=>o?.odds)
      );
  }

}
