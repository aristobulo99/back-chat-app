import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./domain/entity/message.intity";
import { MessageService } from './application/services/message/message.service';
import { MessageController } from './interfaces/controllers/message/message.controller';
import { UserChatService } from "../user-chat/application/services/user-chat/user-chat.service";
import { UserChatModule } from "../user-chat/userChart.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Message]),
        UserChatModule
    ],
    providers: [MessageService],
    controllers: [MessageController]
}) export class MessageModule {}