import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/core/decorators/user.decorator';
import { AuthGuard } from 'src/core/guard/auth/auth.guard';
import { MessageService } from 'src/modules/message/application/services/message/message.service';

@ApiTags('Mensages')
@Controller('message')
export class MessageController {

    constructor(private messageService: MessageService){}

    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: 'Obtener mensages por chat'})
    @Get('/messageByChat/:chatId')
    async getMessageByChatId(@Param('chatId') chatId: number, @User('sub') userId: number){
        return await this.messageService.getMessageByChatId(chatId, userId);
    }   
}
