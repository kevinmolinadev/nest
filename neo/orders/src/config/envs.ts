import "dotenv/config";
import { get } from "env-var";

export const Envs = {
    PORT: get("PORT").required().asPortNumber(),
    DATABASE_URL: get("DATABASE_URL").required().asString(),
    MS_PRODUCT_HOST: get("MS_PRODUCT_HOST").required().asString(),
    MS_PRODUCT_PORT: get("MS_PRODUCT_PORT").required().asPortNumber(),
}