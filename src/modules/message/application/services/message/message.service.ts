import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatService } from 'src/modules/chat/application/services/chat/chat.service';
import { Chat } from 'src/modules/chat/domain/chat.entity';
import { Message } from 'src/modules/message/domain/entity/message.intity';
import { CreateNewMessage } from 'src/modules/message/interfaces/dto/create-new-message.dto';
import { UpdateContentMessage } from 'src/modules/message/interfaces/dto/update-content-message.dto';
import { UserChatService } from 'src/modules/user-chat/application/services/user-chat/user-chat.service';
import { UserChat } from 'src/modules/user-chat/domain/userChat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message) private messageRepository: Repository<Message>,
        private userChatService: UserChatService,
        private chatService: ChatService
    ){}

    private async existeChat(chatId: number, userId: number){
        const existChat: UserChat | null = await this.userChatService.isUserChat(chatId, userId);
        if(!existChat){
            throw new ForbiddenException('El usuario no tiene ningun chat relacionado');
        }
    }

    private async validateMessageIsActive(messageId: number){
        const existMessage = await this.getMessageById(messageId);
        if(!existMessage || !existMessage.active){
            throw new NotFoundException('Mensaje no encotrado');
        }
    }

    async getMessageById(messageId: number){
        return await this.messageRepository.findOneBy({m_id: messageId});
    }

    async getMessageByChatId(chatId: number, userId: number, active: boolean = true){
        await this.existeChat(chatId, userId);

        return await this.messageRepository.createQueryBuilder('message')
            .where('message.chatCId = :chatId', { chatId })
            .andWhere('message.active = :active', { active })
            .orderBy('message.issueDate', 'ASC')
            .getMany();
    }

    async createNewMessage(userId: number, newMessage: CreateNewMessage){
        await this.existeChat(newMessage.chatId, userId);
        
        const chat: Chat | null = await this.chatService.getChatById(newMessage.chatId);
        if(!chat){
            throw new NotFoundException('Chat no encontrado');
        }

        const message = this.messageRepository.create(
            {
                content: newMessage.content,
                transmitter: userId,
                chat
            }
        );

        return await this.messageRepository.save(message);
    }

    async updateContent(updateMessage: UpdateContentMessage){
        await this.validateMessageIsActive(updateMessage.messageId);

        await this.messageRepository.update(updateMessage.messageId, {content: updateMessage.content});

        return await this.getMessageById(updateMessage.messageId);
    }

    async logicalInactivationMessage(messageId: number){
        await this.validateMessageIsActive(messageId);

        await this.messageRepository.update(messageId, {active: false});

        return await this.getMessageById(messageId);
    }
}
