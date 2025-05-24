import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserChat } from 'src/modules/user-chat/domain/userChat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserChatService {
    constructor(
        @InjectRepository(UserChat) private userChatRepositori: Repository<UserChat>
    ){}
}
