import { Injectable } from '@nestjs/common';

export type User = {
    userId: number;
    username: string;
    password: string;
}

// FIXME: This is a mockup. Replace with a real database query
// FIXME: Hash passwords.
const users: User[] = [
    {
        userId: 1,
        username: 'Anne',
        password: 'Anne.123'
    },
    {
        userId: 2,
        username: 'Honda',
        password: 'Honda.123'
    },
];

@Injectable()
export class UsersService {
    async findUserByUsername(username: string): Promise<User | undefined> {
        return users.find((user) => user.username === username);
    }
}
