import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserChatCreate } from 'src/modules/user-chat/domain/interfaces/userchat-entity.interfaces';
import { UserChat } from 'src/modules/user-chat/domain/userChat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserChatService {
    constructor(
        @InjectRepository(UserChat) private userChatRepositori: Repository<UserChat>
    ){}

    async userChatCreate(data: UserChatCreate){
        const userChat = await this.userChatRepositori.create(data)
        return await this.userChatRepositori.save(userChat);
    }

    async isUserChat(chatId: number, userId: number){
        return await this.userChatRepositori.createQueryBuilder('user_chat')
            .where('user_chat.userChat = :userId', { userId })
            .andWhere('user_chat.chatUser = :chatId', { chatId })
            .getOne();
    }
}
