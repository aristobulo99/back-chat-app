import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./domain/entity/message.intity";
import { MessageService } from './application/services/message/message.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([Message])
    ],
    providers: [MessageService],
    controllers: []
}) export class MessageModule {}