import { Component,  ElementRef,  OnInit, ViewChild} from '@angular/core';
import {BetsService} from '@totobosports-new/core';;
@Component({
  selector: 'totobo-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnInit  {
  @ViewChild('rng')range:ElementRef;
  selectedRange:number=5;
  prefs = [];
  durations=[];
  constructor(private betsService:BetsService) { }
  ngOnInit(): void {
    this.prefs=['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];
    this.durations=[{text:'Now',range:1,duration:1}
                    ,{text:'3 hrs',range:2,duration:3}
                    ,{text:'12 hrs',range:3,duration:12}
                    ,{text:'24 hrs',range:4,duration:24}
                    ,{text:'All',range:5,duration:86400}];
  }
  labelClass(val):string{
    let strClass='';
    if(val <= this.selectedRange)
      strClass='selected';
    if(val===this.selectedRange)
      strClass+=',active';
    return strClass;
  }
  rangeChange(durationOption:{text,range,duration}){
    this.range.nativeElement.value=durationOption.range;
    let event= new InputEvent('input',{bubbles:false});
    this.range.nativeElement.dispatchEvent(event);

    //{background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #fff ' + val + '%, #fff 100%)}
  }
  onSlide(rangeCtl){
    // this.selectedRange=+rangeCtl.value;
    this.selectedRange=rangeCtl;
     let selectedDuration=this.durations.find(s=>s.range===this.selectedRange)
     this.betsService.onBetDurationChange(selectedDuration.duration)
  }
}
