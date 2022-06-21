import { Module } from '@nestjs/common';
import { DeparmentService } from './deparment.service';
import { DeparmentController } from './deparment.controller';

@Module({
  providers: [DeparmentService],
  controllers: [DeparmentController]
})
export class DeparmentModule {}
