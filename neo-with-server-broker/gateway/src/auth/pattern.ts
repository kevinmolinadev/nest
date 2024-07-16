import { Services } from "src/config";

const values = {
    create: "create",
    login: "login",
    verify: "verify",
}

export const AuthPattern = Object.entries(values).reduce((acc, [key, value]) => {
    return { ...acc, [key]: `${Services.Auth}.${value}` }
}, values);