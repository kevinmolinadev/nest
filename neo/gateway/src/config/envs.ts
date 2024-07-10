import "dotenv/config"
import { get } from "env-var";

export const Envs = {
    PORT: get("PORT").required().asPortNumber(),
    MS_PRODUCT_HOST: get("MS_PRODUCT_HOST").required().asString(),
    MS_PRODUCT_PORT: get("MS_PRODUCT_PORT").required().asPortNumber(),
    MS_ORDER_HOST: get("MS_ORDER_HOST").required().asString(),
    MS_ORDER_PORT: get("MS_ORDER_PORT").required().asPortNumber(),
}