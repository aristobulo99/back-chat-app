import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        entities: [],
        synchronize: true // Activar solo en desarrollo
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
