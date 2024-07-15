import "dotenv/config";
import { get } from "env-var";

export const Envs = {
    PORT: get("PORT").required().asPortNumber(),
    STRIPE_SECRET: get("STRIPE_SECRET").required().asString(),
    STRIPE_WEBHOOK_SECRET: get("STRIPE_WEBHOOK_SECRET").required().asString(),
    STRIPE_SUCCESS_URL: get("STRIPE_SUCCESS_URL").required().asUrlString(),
    STRIPE_CANCEL_URL: get("STRIPE_CANCEL_URL").required().asUrlString(),
    NATS_SERVERS: get("NATS_SERVERS").required().asArray(),
}