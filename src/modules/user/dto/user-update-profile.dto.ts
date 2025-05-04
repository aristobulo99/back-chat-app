import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty } from "class-validator";

export class UserUpdateProfileDto {

    @ApiProperty({example: 'Nombre completo'})
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({example: 'Foto de perfil'})
    @IsEmpty()
    profilePicture: string;
}