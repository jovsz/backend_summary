import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AlertGateway } from './events/alert/alert.gateway';
import { AlertModule } from './events/alert/alert.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    EventEmitterModule.forRoot(),
    AlertModule
  ],
  controllers: [AppController],
  providers: [AppService, AlertGateway],
})
export class AppModule {}
