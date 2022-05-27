import { Body, Controller, Logger, Post } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { EventsService } from './events.service';
import { Server, Socket } from 'socket.io'

@WebSocketGateway(8001,{
    origin:'*',
    path:'/websocket',
    methods: ["GET","POST"],
    transport: ['websocket','polling'],
    credentials: true,
    allowEIO3: true  
  })

@Controller('events')
export class EventsController implements OnGatewayConnection,OnGatewayInit, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    
    private logger = new Logger('MessageGateway')

    constructor(
        private readonly eventsService: EventsService,
    ){}

    afterInit(server: any) {
        this.logger.log('Initialized!')
    }
    
    async handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client Connected ${client.id}`)
        this.logger.log(client.handshake.query.token)
        this.logger.log(`Totals Clients connected: ${this.server.engine.clientsCount}`)
    }

    async handleDisconnect(client: Socket) {
        this.logger.log(`User disconnet: ${client.id}`)
    }

    // @Post('alert')
    // async generateAlert(
    //     @Body() data:any
    // ){
    //     return await this.eventsService.generateAlert(data)
    // }
}
