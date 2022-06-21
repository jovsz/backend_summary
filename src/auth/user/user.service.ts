import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user-entity'
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { CheckUserDto } from 'src/events/alert/dto/checkUserDto';
import { status } from './enum/status-enum';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private authSerive: AuthService,
     
    ){}



    async checkUser(data: CheckUserDto , socket:string){
        let user = new CreateUserDto()
  
        let hasConnected = false
        console.log(data, socket)
        
        const name = data.full.split(' ');
        const verify = await this.userRepository.findOne({ where: { email: data.email }})
        
        if(!verify){
            user.sockets = []
            user.firstName = name[0]
            user.lastName = name[1]
            user.email = data.email
            user.fullName = data.full
            user.sockets.push(socket)
            
            const save = await this.userRepository.save(user)

            if(!save) throw new NotFoundException('Error saving user')
            await this.userRepository.update(save.id, {status: `${status.ONLINE}`})
            const token = await this.authSerive.generateJwtToken(save.id)
            save.jwt_token = token.token
            save.secure = token.secret
            await this.userRepository.save(save)
            hasConnected = true
            return token.token
        }
            const token = await this.authSerive.generateJwtToken(verify.id)
            verify.sockets.push(socket)
            verify.jwt_token = token.token
            verify.secure = token.secret
            hasConnected = true
        await this.userRepository.update(verify.id, {status: `${status.ONLINE}`})
        await this.userRepository.save(verify)

        
        
        return token.token
    }

    async onDisconnect(socket:string){
        const data = await this.userRepository
        .createQueryBuilder("user")
        .select()
        .where("user.sockets && ARRAY[:...tags]", {tags: [socket]})
        .getOne();

        console.log(data)

        if(data){
            const allSockets = data.sockets.filter(e => e !== socket)
            await this.userRepository.update(data.id, {sockets: allSockets})
            await this.userRepository.update(data.id, {status: `${status.OFFLINE}`})
        }
    }
}
