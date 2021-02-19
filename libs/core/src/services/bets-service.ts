import {Injectable} from '@angular/core';
import {HttpClient,HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Config} from '@totobo/config';
import {environment} from '../../../../apps/bahis-ui/src/environments/environment';
import {catchError, map,switchMap} from 'rxjs/operators';
import {throwError,Subject, Observable} from 'rxjs';
import { Match } from '../models/match.model';
@Injectable()
export class BetsService{
    private durationChangeSubject:Subject<number>;
    public durationChange$:Observable<number>;
    public sports:Observable<any>
    constructor(private http:HttpClient){
        this.durationChangeSubject= new Subject<number>();
        this.durationChange$=this.durationChangeSubject.asObservable();
        this.sports=this.durationChange$.pipe(
            switchMap(d=>this.sidemenu(d.toString()))
            ,map(data=>data.filter(d=>d.MatchCountPre>0).sort((s1,s2)=>s1.SportID-s2.SportID))
            )
        // this.durationChange$.subscribe(duration=>{
        //     this.sports=this.sidemenu(duration.toString());
        // })
    }
    public onBetDurationChange(duration){
        this.durationChangeSubject.next(duration);
    }
    public sidemenu(hours:string){
        console.log("hours:"+hours);
        return this.http.get<any>(
            `${environment.config.apiEndpoint}/bets/pre/menu/${hours}`///pre/menu?h=${hours}&l=2&g=SHOW&x=2
        )
        .pipe(map(res=>res.data),catchError(this.handleError))
    }
    public getLiveMatches(sportId):Observable<Match[]>{
        return this.http.get<{data:Match[]}>(`${environment.config.apiEndpoint}/bets/live/list`)
        .pipe(map(res=>res.data.filter(m=>m.SportID==sportId)),catchError(this.handleError))
    }
    public getMatchDetail(matchId):Observable<Match>{
        return this.http.get<Match>(`${environment.config.apiEndpoint}/bets/live/detail/${matchId}`)
    }
    private handleError(error: HttpErrorResponse) {
        console.log('err')
        if (error.error instanceof ErrorEvent)
            return throwError('error in connection');
        else
            
        return throwError(`Error : ${error}`);
    }
}