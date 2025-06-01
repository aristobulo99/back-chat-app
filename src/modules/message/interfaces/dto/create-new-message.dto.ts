import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateNewMessage {

    @IsNotEmpty()
    @ApiProperty({
        example: 'Contenido del mensaje...'
    })
    content: string;

    @IsNotEmpty()
    @ApiProperty({
        example: 1
    })
    chatId: number
}