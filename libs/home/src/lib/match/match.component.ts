import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import {Observable} from 'rxjs'
import {BetsService, match} from '@totobo/core'
import { filter, map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'totobo-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  constructor(private route:ActivatedRoute,private betService:BetsService) { }
  matches$:Observable<match.Match[]>
  ngOnInit(): void {
    this.matches$=this.route.paramMap.pipe(
      map((p:Params)=>p.get('sport'))
      ,switchMap(m=>this.betService.getLiveMatches(Number(m)))
      ,map(d=>d.filter(md=>(+(md.Odds0))>0 || (+(md.Odds1))>0 || (+(md.Odds2))>0)
          .sort((mt1,mt2)=>Number(mt2.MatchTime)-Number(mt1.MatchTime))
          .slice(0,(d?.length>=8?8:d?.length)))
    )
  }

}
