import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const existing = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existing) {
        throw new ConflictException('Email already in use');
      }

      // TODO: Update bcrypt hash to match environment (>14 - Production | 1 - Development)
      const hashed = await bcrypt.hash(dto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashed,
        },
        include: { sector: true },
      });

      const { password, ...safeUser } = user;
      const token = this.signToken(user.id, user.email);

      return { token, user: safeUser };
    } catch (error) {
      throw error;
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
        include: { sector: true },
      });

      if (!user) throw new UnauthorizedException('Credenciais inválidas');

      if (user.password) {
        const valid = await bcrypt.compare(dto.password, user.password);
        if (!valid) throw new UnauthorizedException('Credenciais inválidas');
      }

      const { password, ...safeUser } = user;
      const token = this.signToken(user.id, user.email);

      return { token, user: safeUser };
    } catch (error) {
      throw error;
    }
  }

  private signToken(userId: number, email: string): string {
    return this.jwt.sign({ sub: userId, email });
  }
}
