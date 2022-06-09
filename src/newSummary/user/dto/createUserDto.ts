import { IsString, IsInt, IsOptional, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

    @IsOptional()
    @IsUUID()
    @IsString()
    id: string;


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
}