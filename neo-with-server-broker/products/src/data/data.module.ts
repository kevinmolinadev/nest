import { Module } from '@nestjs/common';
import { SQLite } from './sqlite/connection';

@Module({
    providers: [SQLite],
    exports: [SQLite]
})
export class DataModule { }
