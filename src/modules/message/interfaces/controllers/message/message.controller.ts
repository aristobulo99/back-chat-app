import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/core/decorators/user.decorator';
import { AuthGuard } from 'src/core/guard/auth/auth.guard';
import { MessageService } from 'src/modules/message/application/services/message/message.service';
import { CreateNewMessage } from '../../dto/create-new-message.dto';
import { UpdateContentMessage } from '../../dto/update-content-message.dto';
import { MessageInactivation } from '../../dto/message-inactivation.dto';

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
    
    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: 'Creacion de mensaje por chat'})
    @Post('newMessage')
    async postNewMessageByChat(@Body() newMessage: CreateNewMessage, @User('sub') userId: number){
        return await this.messageService.createNewMessage(userId, newMessage);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: 'Actualizacio del contenido del mensaje'})
    @Patch('/update-content')
    async patchContentMessage(@Body() updateMessage: UpdateContentMessage){
        return await this.messageService.updateContent(updateMessage);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({
        summary: 'Eliminación lógica del mensaje',
        description: 'Marca el mensaje como no visible (active: false) en lugar de eliminarlo físicamente de la base de datos.'
    })
    @Delete('/message-inactivation')
    async messageInactivation(@Body() messageInac: MessageInactivation){
        return await this.messageService.logicalInactivationMessage(messageInac.messageId);
    }
}
