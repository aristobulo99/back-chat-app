import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../../../infrastructures/services/auth/auth.service';
import { LoginDto } from '../../dto/login.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../../../core/guard/auth/auth.guard';

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

    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: 'Prueba de proteccion de ruta'})
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
