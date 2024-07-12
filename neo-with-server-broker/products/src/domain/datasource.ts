import { Pagination } from "./shared/pagination";

export type Records<T> = {
    data: T[],
    metadata: {
        total: number,
        page: number,
        lastPage: number
    }
}

export interface Datasource<Entity, CreateDto, UpdateDto, Id = string> {
    getAll(pagination: Pagination): Promise<Records<Entity>>,
    getById(id: Id): Promise<Entity>,
    create(data: CreateDto): Promise<Entity>,
    update(data: UpdateDto): Promise<Entity>,
    delete(id: Id): Promise<void>
}