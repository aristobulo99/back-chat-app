import { ApiProperty, PickType } from "@nestjs/swagger";
import { CreateNewMessage } from "./create-new-message.dto";
import { IsNotEmpty } from "class-validator";


export class UpdateContentMessage extends PickType(CreateNewMessage, ['content'] as const) {
    
    @IsNotEmpty()
    @ApiProperty({
        example: 1
    })
    messageId: number

} 