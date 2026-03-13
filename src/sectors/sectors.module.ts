import { Module } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { SectorsController } from './sectors.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SectorsController],
  providers: [SectorsService, PrismaService],
})
export class SectorsModule {}
