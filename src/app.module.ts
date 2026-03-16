import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { SectorsModule } from './sectors/sectors.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, SectorsModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
