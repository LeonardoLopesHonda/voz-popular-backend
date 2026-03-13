import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma-client/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.log('Não funciona');
      throw new InternalServerError({
        cause: 'Falha ao conectar com banco de dados',
        statusCode: 500,
      });
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch (error) {
      throw new InternalServerError({
        cause: 'Falha ao desconectar do banco de dados',
        statusCode: 500,
      });
    }
  }
}

class InternalServerError extends Error {
  action?: string;
  statusCode?: number;
  constructor({ cause, statusCode }: { cause?: string; statusCode?: number }) {
    super('Um erro interno não esperado aconteceu.', {
      cause,
    });
    this.name = 'InternalServerError';
    this.action = 'Entre em contato com o suporte.';
    this.statusCode = statusCode || 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
