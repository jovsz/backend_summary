import { CreateUserDto } from "./createUserDto";
import { PartialType } from "@nestjs/mapped-types";


export class EditUserDto extends PartialType(
    CreateUserDto)
{
    
}