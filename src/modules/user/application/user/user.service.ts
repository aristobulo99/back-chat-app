import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { UserDataDto } from '../../dto/user-by-id.dto';
import { UserUpdateProfileDto } from '../../dto/user-update-profile.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    private async existingUserByEmail(email: string){
        const existingUser = await this.userRepository.findOne({
            where: { email: email },
        });
      
        if (existingUser) {
            throw new ConflictException('El correo electrónico ya está registrado');
        }
    }

    private async existingUserById(id: number){
        const existingUser = await this.userRepository.findOne({
            where: { id },
        });
      
        if (!existingUser) {
            throw new NotFoundException('El usuario no existe');
        }
        return existingUser
    }

    async findAll(): Promise<UserDataDto[]>{
        const users = await this.userRepository.find();
        return users.map(user => plainToClass(UserDataDto, user, { excludeExtraneousValues: true }));
    }

    async findOne(id: number): Promise<UserDataDto> {
        const user = await this.userRepository.findOneBy({ id });
        return plainToClass(UserDataDto, user, {excludeExtraneousValues: true,});
    }

    async create(createUserDto: CreateUserDto): Promise<User>{
        this.existingUserByEmail(createUserDto.email);

        const user = await this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    async updateProfile(id: number, dataUser: UserUpdateProfileDto){
        let user: User = await this.existingUserById(id);

        if (!user.isActive) {
            throw new ForbiddenException('El usuario está inactivo y no puede actualizar su perfil');
          }

        user = {
            ...user,
            ...dataUser
        };
        const updateUser = await this.userRepository.save(user);
        return plainToClass(UserDataDto, updateUser, {excludeExtraneousValues: true,});
    }
}
