import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/application/user/user.service';
import { User } from 'src/modules/user/domain/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ){}

    async signIn(email: string, pass: string){
        const user: User | null = await this.userService.existingUserByEmail(email);

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const { password, ...result } = user;
        return result;
    }
}
