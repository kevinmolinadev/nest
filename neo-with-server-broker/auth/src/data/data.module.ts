import { Module } from "@nestjs/common";
import { Mongo } from "./mongo/connection";

@Module({
    providers: [Mongo],
    exports: [Mongo],
})
export class DataModule { }