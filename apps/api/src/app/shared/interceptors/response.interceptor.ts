import {NestInterceptor,CallHandler,Injectable,ExecutionContext} from '@nestjs/common';
import {classToPlain} from 'class-transformer';
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators';
export interface Response<T>
{
  data:T
}
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T,Response<T>>
{
  intercept(context:ExecutionContext,next:CallHandler){
    return next.handle()
    .pipe(map((data)=>{
      return {
        success:true,
        data:typeof data==='object'?this.transform(data):data
      };
    }));
  }
  private transform(dataObject){
    if(Array.isArray(dataObject))
      return dataObject.map(ob=>this.convertToPlain(ob));
    else
      return this.convertToPlain(dataObject);
  }

  private convertToPlain(classObject){
    return classObject && classObject.constructor!== Object?classToPlain(classObject):classObject;
  }
}
