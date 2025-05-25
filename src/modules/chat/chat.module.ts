import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Chat } from "./domain/chat.entity";
import { ChatService } from './application/services/chat/chat.service';
import { ChatController } from './interfaces/controller/chat/chat.controller';
import { UserModule } from "../user/user.module";
import { UserChatModule } from "../user-chat/userChart.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Chat]),
        UserModule,
        UserChatModule
    ],
    providers: [ChatService],
    controllers: [ChatController]
})
export class ChatModule {}