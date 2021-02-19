import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { AppPreloadingStrategy } from './app-preloading';
import {AuthGuard} from '@totobo/core';
const routes:Routes=[
    {path:'home',loadChildren:()=>import('@totobo/home').then(l=>l.HomeModule),canLoad:[AuthGuard]}
    ,{path:'account',loadChildren:()=>import('@totobo/auth').then(a=>a.AuthModule)}
    ,{path:'',redirectTo:'/home',pathMatch:'full'}
]
@NgModule({
    imports:[RouterModule.forRoot(routes,{
        preloadingStrategy:AppPreloadingStrategy
        ,initialNavigation:'enabled'
    })]
    ,exports:[RouterModule]
})
export class AppRouterModule{
    
}