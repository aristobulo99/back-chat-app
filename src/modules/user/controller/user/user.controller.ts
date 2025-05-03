import { Controller, Get } from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { UserService } from '../../application/user/user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ){}

    @Get('/all')
    @ApiOperation({summary: 'Obtener todos los usuarios'})
    async findAllUsers(){
        return await this.userService.findAll()
    }
}
