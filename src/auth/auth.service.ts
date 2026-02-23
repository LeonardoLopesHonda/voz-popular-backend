import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';

type AuthInput = {
    username: string;
    password: string;
}

type AuthResult = {
    accessToken: string;
    userId: number;
    username: string;
}

type SignInData = {
    userId: number;
    username: string;
}

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async authenticate(input: AuthInput): Promise<AuthResult> {
        const user = await this.validateUser(input);

        if(!user) throw new UnauthorizedException();

        return {
            accessToken: "fake-token",
            userId: user.userId,
            username: user.username
        }
    }

    private validatePassword(input: AuthInput, user: User): SignInData | null {
        if(user.password === input.password) {
            return {
                userId: user.userId,
                username: user.username,
            }
        }
        return null;
    }

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.usersService.findUserByUsername(input.username);
        // FIXME: 204 (No Content) - User not found custom error
        // FIXME: 400 (Bad Request) - Wrong parameters custom error
        if(!user) return null
        return this.validatePassword(input, user);
    }
}
