import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ThemesService } from './themes.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body('name') name: string) {
    return this.themesService.create(name);
  }

  @Get()
  findAll() {
    return this.themesService.findAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.themesService.remove(id);
  }
}
