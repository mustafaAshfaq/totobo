import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../apps/bahis-ui/src/environments/environment'
@Component({
  selector: 'totobo-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  searchPlaceholder = environment.config.header.searchPlaceholder;

  constructor() { }

  ngOnInit(): void {
  }
  doSearch(searchText){

  }
}
