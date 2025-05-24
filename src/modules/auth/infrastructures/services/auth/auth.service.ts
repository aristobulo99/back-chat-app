import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from 'src/core/services/encryption/encryption.service';
import { UserService } from 'src/modules/user/application/services/user/user.service';
import { User } from 'src/modules/user/domain/entity/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private encrypService: EncryptionService
    ){}

    async signIn(email: string, pass: string){
        const user: User | null = await this.userService.existingUserByEmail(email);
        if(!user){
            throw new UnauthorizedException();
        }

        const isPass = await this.encrypService.comparePassword(pass, user.password)
        if (!isPass || !user.isActive) {
            throw new UnauthorizedException();
        }

        const payload = {sub: user.id, email: user.email};
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
