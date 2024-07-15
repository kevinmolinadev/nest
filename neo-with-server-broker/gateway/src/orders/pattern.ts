import { Services } from "src/config";
import { CrudPattern } from "src/shared";

const values = {
    ...CrudPattern,
    paidSuccess: "paidSuccess",
}

export const OrderPattern = Object.entries(values).reduce((acc, [key, value]) => {
    return { ...acc, [key]: `${Services.Order}.${value}` }
}, values)