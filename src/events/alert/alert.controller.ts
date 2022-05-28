import { Body, Controller, Post } from '@nestjs/common';
import { AlertService } from './alert.service';

@Controller('alert')
export class AlertController {
    constructor(
        private readonly alertService: AlertService
    ) {}
    
    @Post('alert')
    async alertGenerate(
        @Body() data: any,
    ){
        console.log(data)
    }

}
