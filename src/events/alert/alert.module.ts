import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { AlertGateway } from './alert.gateway';
import { UserService } from 'src/newSummary/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/index.entities';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    
  ],
  providers: [AlertService, AlertGateway, UserService],
  controllers: [AlertController],
  exports: [AlertService]
})
export class AlertModule {}
