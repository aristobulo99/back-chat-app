import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/modules/message/domain/entity/message.intity';
import { UserChatService } from 'src/modules/user-chat/application/services/user-chat/user-chat.service';
import { UserChat } from 'src/modules/user-chat/domain/userChat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message) private messageRepository: Repository<Message>,
        private userChatService: UserChatService
    ){}

    async getMessageByChatId(chatId: number, userId: number){
        const existChat: UserChat | null = await this.userChatService.isUserChat(chatId, userId);
        if(!existChat){
            throw new ForbiddenException('El usuario no tiene ningun chat relacionado');
        }

        return await this.messageRepository.createQueryBuilder('message')
            .where('message.chatCId = :chatId', { chatId })
            .getMany();
    }
}
