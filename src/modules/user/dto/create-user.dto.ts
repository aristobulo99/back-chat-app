import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        example: 'example@example.com'
    })
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({
        example: 'password'
    })
    password: string;

    @IsNotEmpty()
    @ApiProperty({
        example: 'fullName'
    })
    fullName: string;
    
}