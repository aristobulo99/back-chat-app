import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { TypeChat } from "../../domain/interfaces/chat.interfaces";

export class CreateNewChat {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        example: 'example@example.com'
    })
    recipientEmail: string;

    @IsNotEmpty()
    @ApiProperty({
        example: 'Nombre de Contacto'
    })
    name: string;
}