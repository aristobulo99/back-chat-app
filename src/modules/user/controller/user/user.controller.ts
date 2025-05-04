import { Body, ConflictException, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { UserService } from '../../application/user/user.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserUpdateProfileDto } from '../../dto/user-update-profile.dto';
import { UserUpdateActivationDto } from '../../dto/user-update-activation.dto';

@ApiTags('Usuario')
@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ){}

    @Get('/search/:id')
    @ApiOperation({summary: 'Obtener el usuario por id'})
    async findUserById(@Param('id') id: string){
        try{
            return await this.userService.findOne(Number(id))
        }catch(error){
            throw new ConflictException('Error al obtener los usuarios');
        }
    }

    @Get('/all')
    @ApiOperation({summary: 'Obtener todos los usuarios'})
    async findAllUsers(){
        try{
            const users = await this.userService.findAll();
            return users;
        }catch(error){
            throw new ConflictException('Error al obtener los usuarios');
        }
    }

    @Post('/add')
    @ApiOperation({summary: 'Agregar un usuario'})
    @ApiBody({type: CreateUserDto})
    async createUser(@Body() createUserDto: CreateUserDto){
        const user = await this.userService.create(createUserDto);
        return {
            message: 'Usuario creado correctamente',
            data: user,
            };
    }

    @Patch('/update/profile/:id')
    @ApiOperation({summary: 'Actualizacion de datos de perfil'})
    @ApiBody({type: UserUpdateProfileDto})
    async patchUserProfile(@Body() userData: UserUpdateProfileDto, @Param('id', ParseIntPipe) id: number){
        return await this.userService.updateProfile(id, userData);
    }

    @Patch('/activation/:id')
    @ApiOperation({summary: 'Actualizacion de atributo de activacion'})
    @ApiBody({type: UserUpdateActivationDto})
    async patchUserActive(@Param('id', ParseIntPipe) id: number, @Body() userData: UserUpdateActivationDto){
        return this.userService.updateActive(id, userData.isActive);
    }
}