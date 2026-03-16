import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ThemesService {
  constructor(private prisma: PrismaService) {}

  create(name: string) {
    return this.prisma.theme.create({ data: { name } });
  }

  findAll() {
    return this.prisma.theme.findMany({ orderBy: { name: 'asc' } });
  }

  remove(id: number) {
    return this.prisma.theme.delete({ where: { id } });
  }
}
