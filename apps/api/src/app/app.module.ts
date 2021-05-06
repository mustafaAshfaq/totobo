import { Module,HttpModule } from '@nestjs/common';
import { EventsController } from '../events/events.controller';
import { BetsService } from '../services/bets/bets.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController,EventsController],
  providers: [AppService,BetsService],
})
export class AppModule {}
