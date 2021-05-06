import {Injectable} from '@angular/core';
import {HttpClient,HttpErrorResponse, HttpHeaders} from '@angular/common/http';
//import {Config} from '@totobo/config';
import {environment} from '../../../../apps/web/src/environments/environment';
import {catchError, map,switchMap} from 'rxjs/operators';
import {throwError,Subject, Observable} from 'rxjs';
import { Match } from '../models/match.model';
import {LiveSportEvent, SportEvent,SportOdds} from '@totobosports-new/shared';

@Injectable()
export class BetsService{
    private durationChangeSubject:Subject<number>;
    public durationChange$:Observable<number>;
    public sports:Observable<any>
    baseUrl=environment.apiEndpoint;
    constructor(private http:HttpClient){
        this.durationChangeSubject= new Subject<number>();
        this.durationChange$=this.durationChangeSubject.asObservable();
        this.sports=this.durationChangeSubject.pipe(
            switchMap(d=>this.getUpcomingEvents(d.toString()))
            ,map(data=>data)
            ,catchError(err=>{return [];})
            )

    }
    public onBetDurationChange(duration){
        this.durationChangeSubject.next(duration);
    }
    public getUpcomingEvents(hours:string,day='',countryCode=''){

        return this.http
            .get<{data}>(`${this.baseUrl}/events/upcoming?day=${day}&cc=${countryCode}`)
                .pipe(map(res=>res.data)
                  ,map(sports=>sports.map(ss2=>
                    ss2.filter(sp=>Math.floor(((new Date(+(sp.time)*1000).getTime()- new Date().getTime())/1000)/3600)<=+(hours) || !hours || hours.trim().length===0)))
                  ,map(sports=>sports.filter(sp=>sp && sp.length>0))
                ,catchError(this.handleError));
    }
    public getUpcomingEventsBySport(sportId:string,hours:string=''){
      return this.http
          .get<{data}>(`${this.baseUrl}/events/upcoming?sportId=${sportId}`)
              .pipe(map(res=>res.data)
              ,map(ss2=>ss2.filter(sp=>Math.floor(((new Date(+(sp.time)*1000).getTime()- new Date().getTime())/1000)/3600)<=+(hours) || !hours || hours.trim().length===0))
              ,catchError(this.handleError));
  }
    public getLiveMatches(sportId):Observable<LiveSportEvent[]>{
        var liveEvents= this.http.get<{data:LiveSportEvent[]}>(`${this.baseUrl}/events/live/${sportId}`)
        .pipe(map(res=>res.data)
       // ,switchMap(o=>this.http.get(`${this.baseUrl}/events/${o.}/`))
        ,catchError(this.handleError));

        return liveEvents;
    }
    public getEventOdds(eventId):Observable<any>{
     return this.http.get<{data}>(`${this.baseUrl}/events/${eventId}/odds`)
     .pipe(map(res=>res.data)
     ,catchError(this.handleError));
    }
    public getMatchDetail(matchId):Observable<Match>{
        return this.http.get<Match>(`${this.baseUrl}/bets/live/detail/${matchId}`)
    }
    public getPreLiveMatches(sportId,categoryId,hour=86400):Observable<Match[]>{
        let queryParams='?h='+hour
        if(sportId)
            queryParams+='&s='+sportId;
        if(categoryId)
            queryParams+='&c='+categoryId;
        return this.http.get<{data:Match[]}>(`${this.baseUrl}/bets/pre/list${queryParams}`)
        .pipe(map(res=>res.data.filter(m=> (sportId && m.SportID==sportId)||!sportId))
        ,catchError(this.handleError))
    }
    private handleError(error: HttpErrorResponse) {
        console.log('err')
        if (error.error instanceof ErrorEvent)
            return throwError('error in connection');
        else

        return throwError(`Error : ${error}`);
    }
}
