import { Component, OnInit,Input,Inject,PLATFORM_ID } from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
@Component({
  selector: 'app-categories-list',
  templateUrl: './browse-menu-list.component.html',
  styleUrls: ['./browse-menu-list.component.scss']
})
export class BrowseMenuListComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platfromId:Object) { }
  @Input() taxons;
  @Input() screenwidth;
  ngOnInit() {
  }
  public getTaxonName(taxonName){
    if(isPlatformBrowser(this.platfromId))
      localStorage.setItem('keyword',taxonName);
  }
}