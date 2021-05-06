import {TimeStatusEnum} from './sports.enum'
export interface SportEvent{
    id:number;
    sport_id: number;
    time: string;
    time_status: string ;
    status:string;
    bet365_id:number;
    league:any;
    home:any;
    away:any;
    ss:string;//score
    points:string;
}

export interface LiveSportEvent extends SportEvent{
  timer:{tm,ts,q,tt,md,ta};
  scores:any
}
export interface SportOdds  {
  id:number;home_od:number;away_od:number ;draw_od:number;time_str:string;add_time:number;
 // {"id":"33644108","home_od":"9.500","away_od":"1.035","ss":"41:48","time_str":"2 - 02:48","add_time":"1619004460"}
}
