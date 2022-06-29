import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { AlertGateway } from './alert.gateway';
import { UserService } from 'src/auth/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Notification } from 'src/index.entities';
import { NotificationService } from 'src/newSummary/notification/notification.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Notification])
    
  ],
  providers: [AlertService, AlertGateway, UserService, NotificationService],
  controllers: [AlertController],
  exports: [AlertService]
})
export class AlertModule {}
