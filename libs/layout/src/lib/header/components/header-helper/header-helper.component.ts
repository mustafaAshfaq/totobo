import {Component,OnInit} from '@angular/core';
import { environment} from '../../../../../../../apps/web/src/environments/environment';
@Component({ selector:'app-header-help-dropdown'
,templateUrl:'./header-helper.component.html'
,styleUrls:['./header-helper.component.scss']
})
export class HeaderHelperComponent implements OnInit{
ngOnInit(){
}
public isOpen:boolean;
public contactInfo = environment.config.contact_info.contact_no;
constructor(){}
public onOpenChange(event){
    this.isOpen=!this.isOpen;
}
}