import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, User } from 'src/index.entities';
import { createNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification) private readonly notificationRepo: Repository<Notification>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ){}


    async createNewNotification(data:any, socket: string){
        let obj = new createNotificationDto()
        obj.message = data.action === 'Working' ? `${data.fullName} start ${data.action} on ${data.activity} with ${data.task}` : `${data.fullName}, ${data.action}`
        obj.type = data.type
        obj.currentTime = data.currentTime
        obj.relatedArea = data.relatedArea
        //@ts-ignore
        const save = await this.notificationRepo.save(obj)

        return save

    }

}
