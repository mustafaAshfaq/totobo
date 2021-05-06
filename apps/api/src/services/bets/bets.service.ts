import { HttpService, Injectable } from '@nestjs/common';
import { forkJoin, Observable} from 'rxjs';
import {SportsEnum} from '@totobosports-new/shared'
import {filter, map} from 'rxjs/operators'
@Injectable()
export class BetsService {
    constructor(private http:HttpService){}
    private baseUrl=process.env.API_URL;
    private apiKey=process.env.API_KEY
    public upcoming(sportId:string,day:string,countryCode:string){
      let queryParams=`token=${this.apiKey}&skip_esports=true`;
      if(day && day.trim().length>0)
        queryParams=queryParams+'&day='+day;
      if(countryCode && countryCode.trim().length>0)
        queryParams=queryParams+'&cc='+countryCode;
      if(!sportId || sportId.trim().length==0){
        let requests=Object.values(SportsEnum)
        //.filter(vl=>[1].indexOf(+(vl))<0)
        .map(v=>
            this.http.get(`${this.baseUrl}v2/events/upcoming?sport_id=${v}&${queryParams}`)
                .pipe( map(res=>res.data.results)))
        return  forkJoin(requests);
      }
      else
        return this.http.get(`${this.baseUrl}v2/events/upcoming?sport_id=${sportId}&token=${this.apiKey}&${queryParams}`)
        .pipe( map(res=>res.data.results))

    }

    public live(sportId){
      let url=`${this.baseUrl}v1/events/inplay?sport_id=${sportId}&token=${this.apiKey}`;
      return this.http.get(url).pipe(map(res=>res.data?.results));
    }
    public getOdds(eventId){
      let url=`${this.baseUrl}v2/event/odds?event_id=${eventId}&token=${this.apiKey}&odds_market=1,3,6,8`;
      return this.http.get(url).pipe(map(res=>res.data?.results));
    }
}
