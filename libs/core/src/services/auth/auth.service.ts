import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../../apps/bahis-ui/src/environments/environment'
import {throwError} from 'rxjs'
import { catchError, map ,tap} from 'rxjs/operators';
@Injectable()
export class AuthService {

  constructor(private http:HttpClient) { }
  
  login(creds:{username,password}){
    return this.http.post(`https://birotyapp-auth.azurewebsites.net/users/login`,{email:creds.username,password:creds.password})//(environment.apiEndpoint+"/accounts/login",creds)
    .pipe(
      map(data=>data)
      ,catchError(this.handleError)
    )
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent)
        return throwError('error in connection');
    else{
    return throwError(`Error : ${error.message}`);}
}
}
