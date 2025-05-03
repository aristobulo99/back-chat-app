import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/domain/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 3307,
        username: 'root',
        password: '123456789',
        database: 'chat_app',
        entities: [User],
        synchronize: true // Activar solo en desarrollo
      }
    ),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
