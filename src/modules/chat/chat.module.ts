import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Chat } from "./domain/chat.entity";
import { ChatService } from './application/services/chat/chat.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([Chat])
    ],
    providers: [ChatService],
    controllers: []
})
export class ChatModule {}