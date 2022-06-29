import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class createNotificationDto {
    @IsNotEmpty()
    @IsString()
    message:string;

    @IsNotEmpty()
    @IsString()
    type:string

    @IsString()
    @IsOptional()
    currentTime: string

    @IsOptional()
    user_id: string;;
}