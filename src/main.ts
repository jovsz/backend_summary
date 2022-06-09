import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger,ValidationPipe } from '@nestjs/common';
import { urlencoded, json } from 'express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const allowedDomains = ['http://localhost:3000','http://127.0.0.1:3000', 'https://v2fineinteriors.quickbase.com/', 'https://api.quickbase.com', 'https://new.v2fineinteriors.app'];
  
  app.use(cors({
    origin:function (origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);
   
      if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials:true,
  }))

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const config = new DocumentBuilder()
  .setTitle('New Summary')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();

  app.use(cookieParser());
  
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
    await app.listen(8001);
    Logger.log(`Server is running in ${await app.getUrl()}`)
}
bootstrap();
