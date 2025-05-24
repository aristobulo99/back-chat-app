import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {

    @ApiProperty({example: 'example@example.com'})
    @IsEmail()
    email: string;

    @ApiProperty({example: 'password'})
    @MinLength(6)
    password: string
}