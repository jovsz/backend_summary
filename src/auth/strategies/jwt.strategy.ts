import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/index.entities";
import { Repository } from "typeorm";


@Injectable()
export class generateJwtToken extends PassportStrategy( Strategy, 'jwt'){
    constructor(@InjectRepository(User)
            private readonly userRepository: Repository<User>,
        ) {
        
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: process.env.JWT_KEY
            });
    }
    
    async validate(payload: any){
        const data = await this.userRepository.findOne(payload.sub)
        return data;
    }

}