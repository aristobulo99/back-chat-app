import { Controller, Get } from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { UserService } from '../../application/user/user.service';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ){}

    @Get()
    async findAllUsers(){
        return await this.userService.findAll()
    }
}
