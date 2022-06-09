import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user-entity'
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { status } from './enum/status-enum';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ){}



    async checkUser(full: string, socket:string){
        let user = new CreateUserDto()
        
        const name = full.split(' ');
        const verify = await this.userRepository.findOne({ where: { fullName: full }})
        
        if(!verify){
            user.sockets = []
            user.firstName = name[0]
            user.lastName = name[1]
            user.fullName = full
            user.sockets.push(socket)
            
            const save = await this.userRepository.save(user)

            if(!save) throw new NotFoundException('Error saving user')
            await this.userRepository.update(save.id, {status: `${status.ONLINE}`})

            return true
        }
       
        verify.sockets.push(socket)
       
        await this.userRepository.update(verify.id, {status: `${status.ONLINE}`})
        await this.userRepository.save(verify)
        
        return true
    }

    async onDisconnect(socket:string){
        const data = await this.userRepository.createQueryBuilder('user')
        .select()
        .where('user.sockets ::jsonb @> :sockets', {
          sockets: JSON.stringify([socket])
        })
        .printSql()
        .getMany();
        
        console.log(socket)
        console.log(data)
    }
}
