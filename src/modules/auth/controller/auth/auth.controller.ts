import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { LoginDto } from '../../dto/login.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Autentificación')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Atributos de Login'})
    @ApiBody({type: LoginDto})
    @Post('login')
    signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
    }
}
