import { Body, Controller, Post } from '@nestjs/common';
import { AlertGateway } from './alert.gateway';
import { AlertService } from './alert.service';

@Controller('alert')
export class AlertController {
    constructor(
        private readonly alertService: AlertService,
        private readonly alertgateway: AlertGateway,
    ) {}
    
    @Post('alert')
    async alertGenerate(
        @Body() data: any,
    ){
        // console.log(data)
        return await this.alertgateway.sendAlert(data)
    }

}
