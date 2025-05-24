import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entity/user.entity';
import { UserService } from './application/services/user/user.service';
import { UserController } from './interfaces/controller/user/user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
