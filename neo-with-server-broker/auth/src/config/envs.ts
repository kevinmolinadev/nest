import { get } from "env-var";

export const Envs = {
    NATS_SERVERS: get("NATS_SERVERS").required().asArray(),
    DATABASE_URL: get("DATABASE_URL").required().asUrlString(),
    JWT_SECRET: get("JWT_SECRET").required().asString(),
    JWT_EXPIRES_IN: get("JWT_EXPIRES_IN").required().asString()
}