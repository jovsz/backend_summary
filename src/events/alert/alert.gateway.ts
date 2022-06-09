import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { User } from 'src/index.entities';
import { UserService } from 'src/newSummary/user/user.service';
import { getRepository, Repository } from 'typeorm';


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
      @MessageBody() data: any
    ){
      if(data){
        await this.userService.checkUser(data, client.id)
        
      }
    }
   

    async sendAlert(
        data:any,
    ){
      
        this.server.emit('newAlert',data)
        return 'Alerta Enviada'
    }
    
   
  }