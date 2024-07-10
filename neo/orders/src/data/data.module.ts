import { Module } from '@nestjs/common';
import { PostgreSQL } from './postgresql/connection';

@Module({
    providers: [PostgreSQL],
    exports: [PostgreSQL]
})
export class DataModule { }
