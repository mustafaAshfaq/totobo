import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {NgxJsonLdModule} from '@ngx-lite/json-ld';
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {RatingModule} from 'ngx-bootstrap/rating';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TabsModule,TabsetConfig} from 'ngx-bootstrap/tabs';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
@NgModule({
  imports: [CommonModule,NgxJsonLdModule,NgProgressModule,NgProgressHttpModule
    ,ReactiveFormsModule,FormsModule
  ,BsDropdownModule,TypeaheadModule,RatingModule,ModalModule,TabsModule.forRoot()

],
  exports:[CommonModule,NgxJsonLdModule,NgProgressModule,NgProgressHttpModule
    ,ReactiveFormsModule,FormsModule
    ,ReactiveFormsModule,FormsModule
  ,BsDropdownModule,TypeaheadModule,RatingModule,ModalModule,TabsModule
  , SearchbarComponent, RangeSliderComponent
],
  declarations: [SearchbarComponent, RangeSliderComponent]
})
export class SharedModule {}
