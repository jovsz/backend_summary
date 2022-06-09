import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway(8002, {
    cors: { origin: '*' },
    methods: ["GET","POST"],
    transport: ['websocket','polling'],
    path: '/websocket',
    credentials: true,
  })
  export class AlertGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    @WebSocketServer() server: Server;
  
    afterInit(server: any) {
      console.log('Esto se ejecuta cuando inicia')
    }
  
    handleConnection(client: any, ...args: any[]) {
      console.log('Hola alguien se conecto al socket');
    }
  
    handleDisconnect(client: any) {
      console.log('ALguien se fue! chao chao')
    }
  

    async sendAlert(
        data:any,
    ){
        console.log(data)
        this.server.emit('newAlert',data)
        return 'Alerta Enviada'
    }
    
   
  }