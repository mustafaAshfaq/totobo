import {RouterStateSerializer} from '@ngrx/router-store';
import {Params,RouterStateSnapshot} from '@angular/router';

export interface RouterStateUrl{
    url:string;
    queryParams:Params
}

export class CustomRouterStateSerializer extends RouterStateSerializer<RouterStateUrl>{
    serialize(router:RouterStateSnapshot):RouterStateUrl{
        const url=router.url;
        const queryParams=router.root.queryParams;
        return {url,queryParams};
    }
}