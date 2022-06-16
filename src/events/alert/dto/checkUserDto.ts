import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CheckUserDto {
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    full:string
}