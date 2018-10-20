export interface ICRUDService<M, T> {
    listAll(): Promise<M[]>
    getOne(id: T): Promise<M | null>
    create(obj: M): Promise<M>
    update(obj: M): Promise<M>
    delete(id: T): Promise<void>
}