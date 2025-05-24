import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserChat } from "./domain/userChat.entity";
import { UserChatService } from './application/services/user-chat/user-chat.service';


@Module({
    imports: [TypeOrmModule.forFeature([UserChat])],
    providers: [UserChatService],
    controllers: []
})
export class UserChatModule {}