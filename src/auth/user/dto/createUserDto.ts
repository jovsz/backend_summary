import { IsString, IsInt, IsOptional, IsUUID, IsNotEmpty, IsEmail, IsJWT } from 'class-validator';

export class CreateUserDto {

    @IsOptional()
    @IsUUID()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsOptional()
    sockets: string[];

    @IsOptional()
    @IsJWT()
    jwt_token: string;

    @IsOptional()
    @IsString()
    secure: string;
}