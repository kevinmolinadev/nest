import "dotenv/config";
import { get } from "env-var";

export const Envs = {
    PORT: get("PORT").required().asPortNumber(),
    DATABASE_URL: get("DATABASE_URL").required().asString(),
}