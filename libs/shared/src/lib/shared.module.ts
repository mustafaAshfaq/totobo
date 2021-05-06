import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NgxJsonLdModule} from '@ngx-lite/json-ld';
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {RatingModule} from 'ngx-bootstrap/rating';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TooltipModule} from 'ngx-bootstrap/tooltip'
import {TabsModule,TabsetConfig} from 'ngx-bootstrap/tabs';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PrematchlistComponent } from './components/prematchlist/prematchlist.component';
import {PreMatchComponent} from './components/prematchlist/components/pre-match/pre-match.component';
import {PreMatchDetailsComponent} from './components/prematchlist/components/pre-match-details/pre-match-details.component'
import { RouterModule } from '@angular/router';
@NgModule({
imports:[CommonModule,RouterModule.forChild([])
    ,ReactiveFormsModule,FormsModule
    ,NgxJsonLdModule,NgProgressModule,NgProgressHttpModule
  ,BsDropdownModule.forRoot(),TypeaheadModule.forRoot(),RatingModule,ModalModule,TabsModule.forRoot(),TooltipModule.forRoot()],
  exports:[CommonModule,NgxJsonLdModule,NgProgressModule,NgProgressHttpModule
    ,ReactiveFormsModule,FormsModule
    ,NgxJsonLdModule,NgProgressModule,NgProgressHttpModule
    ,BsDropdownModule,TypeaheadModule,RatingModule,ModalModule,TabsModule,TooltipModule
    ,SearchBarComponent,PrematchlistComponent
  ],
  declarations: [SearchBarComponent,PrematchlistComponent,PreMatchDetailsComponent,PreMatchComponent],
})
export class SharedModule{}
