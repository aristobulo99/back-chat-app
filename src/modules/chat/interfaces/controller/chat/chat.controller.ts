import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guard/auth/auth.guard';
import { CreateNewChat } from '../../dto/create-new-chat.dto';
import { ChatService } from 'src/modules/chat/application/services/chat/chat.service';
import { User } from 'src/core/decorators/user.decorator';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService){}

    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @Post('/new-caht')
    @ApiOperation({summary: 'Crea nuevo chat'})
    @ApiBody({type: CreateNewChat})
    async createNewChat(@User('email') email: string ,@Body() newChat: CreateNewChat){
        return await this.chatService.createNewChatPrivate(email, newChat);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @Get('/my-chats')
    @ApiOperation({summary: ''})
    async getMyChats(@User('email') email: string){
        return await this.chatService.findUserChatsByEmail(email);
    }


}
