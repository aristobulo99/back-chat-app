import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/modules/chat/domain/chat.entity';
import { TypeChat } from 'src/modules/chat/domain/interfaces/chat.interfaces';
import { CreateNewChat } from 'src/modules/chat/interfaces/dto/create-new-chat.dto';
import { MyChat, MyContacts } from 'src/modules/chat/interfaces/interfaces/mychat.interface';
import { UserChatService } from 'src/modules/user-chat/application/services/user-chat/user-chat.service';
import { Role, State } from 'src/modules/user-chat/interfaces/user-chat.interface';
import { UserService } from 'src/modules/user/application/services/user/user.service';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private chatRepositori: Repository<Chat>,
        private userService: UserService,
        private userChatService: UserChatService
    ){}

    async getChatById(chatId: number){
        return await this.chatRepositori.findOne({where: {c_id: chatId}})
    }

    async chatExistsBetweenUsers(userId1: number, userId2: number){
        return await this.chatRepositori.createQueryBuilder('chat')
            .innerJoin('chat.user', 'user1', 'user1.userChat = :userId1', {userId1})
            .innerJoin('chat.user', 'user2', 'user2.userChat = :userId2', {userId2})
            .where('chat.type = :type', {type: TypeChat.private})
            .getOne();
    }

    async createNewChatPrivate(email: string, newChat: CreateNewChat){
        const sendingUser: User | null = await this.userService.existingUserByEmail(email);
        const recipientUser: User  | null = await this.userService.existingUserByEmail(newChat.recipientEmail);
        
        if(!sendingUser || !sendingUser.isActive){
            throw new ConflictException('El usuario no puede crear un nuevo chat');
        }

        if(!recipientUser || !recipientUser.isActive){
            throw new ConflictException('El usuario destinatario no existe o esta inactivo');
        }

        if (sendingUser.email === recipientUser.email) {
            throw new ConflictException('No puedes iniciar un chat contigo mismo');
        }

        const existChat = await this.chatExistsBetweenUsers(sendingUser.id, recipientUser.id);
        if(existChat){
            throw new ConflictException('Existe un chat entre los usuarios');
        }

        const newPrivateChat = await this.chatRepositori.create(
            {
                type: TypeChat.private,
                name: '',
                photo: ''
            }
        );
        await this.chatRepositori.save(newPrivateChat);

        await this.userChatService.userChatCreate(
            {
                userChat: sendingUser,
                chatUser: newPrivateChat,
                name: ''
            }
        );
        await this.userChatService.userChatCreate(
            {
                userChat: recipientUser,
                chatUser: newPrivateChat,
                name: newChat.name
            }
        );

        return {
            message: 'Chat privado creado exitosamente',
        };
    }

    async findUserChatsByEmail(email: string){
        const existUser: User | null = await this.userService.existingUserByEmail(email);

        if(!existUser || !existUser.isActive){
            throw new ConflictException('El usuario no esta registrado o esta inactivo');
        }
        const chats = await this.chatRepositori.createQueryBuilder('chat')
            .innerJoin('chat.user', 'userChat')
            .innerJoin('userChat.userChat', 'user')
            .where('user.email = :email', { email })
            .leftJoinAndSelect('chat.user', 'allUserChats')
            .leftJoinAndSelect('allUserChats.userChat', 'allUsers')
            .andWhere('allUsers.id != :userId', { userId: existUser.id })
            .getMany();
        
        return chats.map<MyChat>(c => (
            {
                c_id: c.c_id,
                type: c.type,
                name: c.name,
                photo: c.photo,
                createDate: c.createDate,
                contacts: c.user.map<MyContacts>(uc => ({
                    uc_id: uc.uc_id,
                    u_id: uc.userChat.id,
                    fullName: uc.userChat.fullName,
                    email: uc.userChat.email,
                    nameContact: uc.name,
                    isActive: uc.userChat.isActive,
                    profilePicture: uc.userChat.profilePicture,
                    startDate: uc.startDate,
                }))
            }
        ));
    }
}
