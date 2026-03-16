import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        isAdmin: true,
        emailVerifiedAt: true,
        createdAt: true,
        sector: { select: { id: true, name: true } },
      },
    });
  }

  async update(userId: number, dto: UpdateUserDto) {
    const data: any = { ...dto };

    if (dto.password) {
      // TODO: Update bcrypt hash to match environment (>14 - Production | 1 - Development)
      data.password = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        isAdmin: true,
        sector: { select: { id: true, name: true } },
      },
    });
  }
}
