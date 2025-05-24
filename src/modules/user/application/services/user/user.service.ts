import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../../interfaces/dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { UserDataDto } from '../../../interfaces/dto/user-by-id.dto';
import { UserUpdateProfileDto } from '../../../interfaces/dto/user-update-profile.dto';
import { EncryptionService } from 'src/core/services/encryption/encryption.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private encrypService: EncryptionService
    ){}

    async existingUserByEmail(email: string){
        return await this.userRepository.findOne({
            where: { email: email },
        });
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

    async create(createUserDto: CreateUserDto){
        const userData = await this.existingUserByEmail(createUserDto.email);

        if(userData){
            if(userData.isActive){
                throw new ConflictException('El correo electrónico ya está registrado')
            }
            return await this.update({...userData, ...createUserDto,  isActive: true});
        }
        
        createUserDto.password = await this.encrypService.hashPassword(createUserDto.password);
        const user = await this.userRepository.create(createUserDto);
        const newUser = await this.userRepository.save(user);
        return plainToClass(UserDataDto, newUser, {excludeExtraneousValues: true,});
    }

    async update(user: User){
        const updateUser = await this.userRepository.save(user);
        return plainToClass(UserDataDto, updateUser, {excludeExtraneousValues: true,});
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

    async updateActive(id: number, isActive: boolean){
        const user = await this.existingUserById(id);

        user.isActive = isActive;

        const updateUser = await this.userRepository.save(user);
        return plainToClass(UserDataDto, updateUser, {excludeExtraneousValues: true,});
    }

    async delete(id: number){
        await this.existingUserById(id);
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`No se pudo eliminar el usuario con ID ${id}`);
        }

        return {
            message: 'Usuario eliminado correctamente',
            id,
        };
    }
}
