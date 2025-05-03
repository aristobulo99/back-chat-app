import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { UserService } from './application/user/user.service';
import { UserController } from './controller/user/user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
