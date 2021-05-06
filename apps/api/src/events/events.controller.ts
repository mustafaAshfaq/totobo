import { Controller, Get, Param ,Query} from '@nestjs/common';
import { get } from 'http';
import { map } from 'rxjs/operators';
import { BetsService } from '../services/bets/bets.service';

@Controller('events')
export class EventsController {
    constructor(private betsService:BetsService){}
    @Get('/upcoming')
    upcomingEvents(@Query('sportId') sportId:string,@Query('day') day='',@Query('cc')countryCode=''){
      if(!sportId || sportId.trim().length==0)
        return this.betsService.upcoming(sportId,day,countryCode).pipe(map(s=>s.filter(ss=>ss!==undefined && ss.length>0)))
      else
        return this.betsService.upcoming(sportId,day,countryCode)
    //    var results= await this.betsService.upcoming(period);
    //    var finalResult:any[]=[];

    //    if(results){
    //        var events=await results.toPromise();

    //        if(events && events.length>0){
    //         events.filter(e=>((e as any[])!==undefined && (e as any[])!==null)&&(e as any[]).length>0).forEach(ev=>ev.forEach(evd=>finalResult.push(evd)));
    //        }
    //    }
    //    return finalResult;
    }
    @Get('/live/:sportId')
    liveEvents(@Param('sportId') sportId:number){
      return this.betsService.live(sportId);
    }
    @Get('/:eventId/odds')
    getOdds(@Param('eventId')eventId:number){
      return this.betsService.getOdds(eventId);
    }
}
