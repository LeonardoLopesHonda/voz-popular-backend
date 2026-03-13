import { Injectable } from '@nestjs/common';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SectorsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSectorDto) {
    return this.prisma.sector.create({ data: dto });
  }

  findAll() {
    return this.prisma.sector.findMany({ orderBy: { name: 'asc' } });
  }

  update(id: number, dto: UpdateSectorDto) {
    return this.prisma.sector.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.sector.delete({ where: { id } });
  }
}
