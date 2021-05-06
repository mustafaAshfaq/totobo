/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

 import { Logger,ValidationPipe } from '@nestjs/common';
 import { NestFactory } from '@nestjs/core';
 
 import { AppModule } from './app/app.module';
 import {ResponseInterceptor} from '../src/app/shared/interceptors/response.interceptor';
 import './config';
 async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   const globalPrefix = 'api';
   app.setGlobalPrefix(globalPrefix);
   app.enableCors({
     origin: process.env.NODE_ENV === 'dev' ? '*' : [process.env.FRONT_BASE_URL],
     preflightContinue: false,
     allowedHeaders: ['Content-Type', 'Authorization'],
     methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   })
   app.useGlobalPipes(  new ValidationPipe({
     transform:true
   }));
   app.useGlobalInterceptors( new ResponseInterceptor())
   const port = process.env.PORT || 3333;
   await app.listen(port, () => {
     Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
   });
 }
 
 bootstrap();
