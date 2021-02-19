import {RouterStateSerializer} from '@ngrx/router-store';
import  {Params, RouterStateSnapshot} from '@angular/router';

export interface RouterStateUrl{
    url:string,
    queryParams:Params
}

export class CustomRouterStateSerializer extends RouterStateSerializer<RouterStateUrl>{
    serialize(routerState:RouterStateSnapshot):RouterStateUrl{
        const url= routerState.url;
        const queryParams=routerState.root.queryParams;
        return {url,queryParams};
    }

}