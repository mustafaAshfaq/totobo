import { Injectable } from '@angular/core';
import {PreloadingStrategy,Route} from '@angular/router';
import {of, timer} from 'rxjs'
import { mergeMap } from 'rxjs/operators';
@Injectable({providedIn:"root"})
export class AppPreloadingStrategy implements PreloadingStrategy{
    preload(route:Route,load:Function){
        if(route.data && route.data.preload){
            let loadRoute=delay=> delay? timer(150).pipe(mergeMap(_=>load())):load()
            return loadRoute(route.data?.delay);
        }
        return of(null);
    }
}