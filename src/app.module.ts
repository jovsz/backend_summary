import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AlertGateway } from './events/alert/alert.gateway';
import { AuthModule } from './auth/auth.module'
import { AlertModule } from './events/alert/alert.module';
import { UserModule } from './auth/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + './**/**/*entity{.ts,.js}'],
      autoLoadEntities: true,//auto cargar entidades relacionales
      synchronize: true,
    }),
    EventEmitterModule.forRoot(),
    AlertModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
