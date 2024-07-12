import { Services } from "../services";

export enum OrderPattern {
    getAll = `${Services.Order}.getAll`,
    getOne = `${Services.Order}.get`,
    create = `${Services.Order}.create`,
    update = `${Services.Order}.update`,
    delete = `${Services.Order}.delete`,
}