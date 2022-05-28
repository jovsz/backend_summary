import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { AlertGateway } from './alert.gateway';

@Module({
  providers: [AlertService, AlertGateway],
  controllers: [AlertController],
  exports: [AlertService]
})
export class AlertModule {}
