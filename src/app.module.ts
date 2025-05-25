import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/domain/entity/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserChatModule } from './modules/user-chat/userChart.module';
import { ChatModule } from './modules/chat/chat.module';
import { Chat } from './modules/chat/domain/chat.entity';
import { UserChat } from './modules/user-chat/domain/userChat.entity';
import { Message } from './modules/message/domain/entity/message.intity';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 3307,
        username: 'root',
        password: '123456789',
        database: 'chat_app',
        entities: [User, Chat, UserChat, Message],
        synchronize: true // Activar solo en desarrollo
      }
    ),
    UserModule,
    AuthModule,
    UserChatModule,
    ChatModule,
    MessageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
