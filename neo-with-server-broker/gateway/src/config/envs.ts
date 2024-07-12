import "dotenv/config"
import { get } from "env-var";

export const Envs = {
    PORT: get("PORT").required().asPortNumber(),
    NATS_SERVERS: get("NATS_SERVERS").required().asArray(),
}