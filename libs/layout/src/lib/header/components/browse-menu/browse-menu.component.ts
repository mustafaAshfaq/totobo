import { Component, OnInit, Input,ChangeDetectionStrategy,OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs'
import {trigger,animate,transition,state,style} from '@angular/animations';
import {ActivatedRoute} from '@angular/router';
//import {AppState} from '../../../../../../../apps/web/src/app/store/state';
//import {Store} from '@ngrx/store';
import {HttpParams} from '@angular/common/http';
@Component({
  selector: 'app-categories-menu-dropdown',
  templateUrl: './browse-menu.component.html',
  styleUrls: ['./browse-menu.component.scss'],
  animations:[
    trigger('popOverState', [
      state(
        'show',
        style({
          left: -100 + '%'
        })
      ),
      state(
        'hide',
        style({
          left: 0
        })
      ),
      transition('show => hide', animate('100ms ease-out')),
      transition('hide => show', animate('200ms ease-in'))
    ])
  ],
 changeDetection:ChangeDetectionStrategy.OnPush
})
export class BrowseMenuComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.subscriptionList$.forEach(subs=>subs.unsubscribe());
  }
  @Input() taxonomies;
  @Input() isScrolled;
  @Input() screenWidth;
  public isOpen:boolean;
  public catgeory_taxonomy;
  public selectedItem=0;
  public menuTaxons;
  public autoclose:boolean;
  public show:boolean=false;
  private subscriptionList$:Array<Subscription>=[];
  private queryParams:any;
  constructor(private route:ActivatedRoute) {
    this.subscriptionList$.push(this.route.queryParams.subscribe(params=>this.queryParams=params))
   }

  get stateName(){
    return this.show?'show':'hide';
  }
  ngOnInit() {
    if (this.screenWidth <= 600) {
      this.autoclose = false;
    } else {
      this.autoclose = true;
    }
    
  }
  public onOpenChange(event){
    if(this.taxonomies && this.taxonomies[0].root.taxons){
      this.selectedItem=0;
      this.menuTaxons=this.taxonomies[0].root.taxons[0];
    }
    
  }

  public showCategoryOnClick(i){
    this.show=!this.show;
    if(this.screenWidth<600)
      this.menuTaxons=this.taxonomies[0].root.taxons[i];
  }
  public showCategory(i){
    this.selectedItem=i;
    this.menuTaxons=this.taxonomies[0].root.taxons[i];
  }

  getCategeory() {
    const search = new HttpParams();
    search.set('id', this.queryParams.id);
    // this.store.dispatch(this.searchActions.getProductsByTaxon(search.toString()))
  }
}
