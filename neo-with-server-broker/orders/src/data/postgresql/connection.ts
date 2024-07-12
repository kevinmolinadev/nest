import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PostgreSQL extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        Logger.log("PostgreSQL conected", "DB")
    }
}