import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../apps/web/src/environments/environment';

@Component({ selector:'totobosports-new-footer',templateUrl:'./footer.component.html',styleUrls:['./footer.component.scss']})
export class FooterComponent implements OnInit{
    public contact_info = environment.config.contact_info;
ngOnInit(){
}
constructor(){}

}
