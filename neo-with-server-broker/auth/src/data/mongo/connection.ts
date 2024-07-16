import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import mongoose from "mongoose";
import { Envs } from "src/config";

@Injectable()
export class Mongo implements OnModuleInit {
    async onModuleInit() {
        await mongoose.connect(Envs.DATABASE_URL);
        Logger.log("Mongo connected", "DB");
    }
}