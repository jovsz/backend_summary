import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { User } from 'src/index.entities';
import { CheckUserDto } from './dto/checkUserDto';
import { UserService } from 'src/auth/user/user.service';
import { NotificationService } from 'src/newSummary/notification/notification.service';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto'


  @WebSocketGateway(8002, {
    cors: { origin: ['https://new.v2fineinteriors.app', 'http://localhost:3000'] },
    methods: ["GET","POST"],
    transport: ['websocket','polling'],
    path: '/websocket',
    allowEIO3: true,
    credentials: true,
  })
  export class AlertGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    @WebSocketServer() server: Server;
     
    private logger = new Logger('MessageGateway')

    constructor(
      private readonly userService: UserService,
      private readonly notificationService: NotificationService, 
      
    ) {

    }
    
    afterInit(server: any) {
      this.logger.log('Inicializo')
    }
  
    handleConnection(client: any, ...args: any[]) {
      
    }
  
    async handleDisconnect(client: any) {
      this.logger.log('Se marcho')
      await this.userService.onDisconnect(client.id)
    }
  
    @SubscribeMessage('checkUser')
    async check(
      @ConnectedSocket() client: Socket,
      @MessageBody() data: CheckUserDto
    ){
      
      if(data){
        const response =  await this.userService.checkUser(data, client.id)
        
        if(response) this.server.to(client.id).emit('checkResponse',response)

      }
    }

    @SubscribeMessage('updateDashboard')
    async updateDashboardPro(
      @ConnectedSocket() client: Socket,
      @MessageBody() data: any,
    ){
      this.server.emit('updateDashboardResponse', data)
    }
   

    async sendAlert(
        data:any,
    ){
        this.server.emit('newAlert',data)
    }

    @SubscribeMessage('sendAlert')
    async sendAlertSocket(
      @ConnectedSocket() client: Socket,
      @MessageBody() data:any,
    ){ 
        
        let save = await this.notificationService.createNewNotification(data, client.id.toString())
        console.log(save)
        if(save){
          await client.broadcast.emit('newAlert',save)
        }
        
    }
  }