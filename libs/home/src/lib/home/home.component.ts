import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'totobo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute) { }
  sportIdSelected:number;
  ngOnInit(): void {
    this.sportIdSelected=1;
    this.navigateToSport(1);
  }
 
  navigateToSport(sport){
    this.router.navigate([
      { outlets:
       {
           sport:[sport]
       }
   }],{relativeTo:this.route}
   );
  }
}
