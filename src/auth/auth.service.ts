import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
const argon2 = require('argon2');

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ){}


    async generateJwtToken(id:string){
        const createToken = await this.jwtService.signAsync({id: id},{
            secret: process.env.JWT_KEY,
            expiresIn: "1day"
        })

        const encrypt = await argon2.hash(createToken)

        return {
            token: createToken,
            secret: encrypt
        } 
    }
}
