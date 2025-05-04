import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { UserDataDto } from '../../dto/user-by-id.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async findAll(): Promise<UserDataDto[]>{
        const users = await this.userRepository.find();
        return users.map(user => plainToClass(UserDataDto, user, { excludeExtraneousValues: true }));
    }

    async findOne(id: number): Promise<UserDataDto> {
        const user = await this.userRepository.findOneBy({ id });
        return plainToClass(UserDataDto, user, {excludeExtraneousValues: true,});
    }

    async create(createUserDto: CreateUserDto): Promise<User>{
        const existingUser = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });
      
        if (existingUser) {
        throw new ConflictException('El correo electrónico ya está registrado');
        }

        const user = await this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }
}
