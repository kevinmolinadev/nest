import { Services } from "src/config";
import { CrudPattern } from "src/shared";

const values = {
    ...CrudPattern,
}

export const ProductPattern = Object.entries(values).reduce((acc, [key, value]) => {
    return { ...acc, [key]: `${Services.Product}.${value}` }
}, values)