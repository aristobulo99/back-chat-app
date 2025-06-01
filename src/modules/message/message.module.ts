import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./domain/entity/message.intity";
import { MessageService } from './application/services/message/message.service';
import { MessageController } from './interfaces/controllers/message/message.controller';
import { UserChatModule } from "../user-chat/userChart.module";
import { ChatModule } from "../chat/chat.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Message]),
        UserChatModule,
        ChatModule
    ],
    providers: [MessageService],
    controllers: [MessageController]
}) export class MessageModule {}