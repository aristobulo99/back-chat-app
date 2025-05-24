import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UserUpdateActivationDto {

    @ApiProperty({example: true})
    @IsBoolean()
    isActive: boolean;
}