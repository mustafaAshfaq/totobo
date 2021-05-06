import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'totobo-pre-match',
  templateUrl: './pre-match.component.html',
  styleUrls: ['./pre-match.component.scss']
})
export class PreMatchComponent implements OnInit,OnChanges {

  constructor() { }
  matches:[];
  @Input()preMatches$
  ngOnInit(): void {
    this.preMatches$.subscribe(m=>this.matches=m[0])
  }
  ngOnChanges(changes){

  }

}
