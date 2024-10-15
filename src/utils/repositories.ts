export interface ICRUDRepository<T> {
  load(id: string): Promise<T>;
  insert(obj: T): Promise<number>;
  update(obj: T): Promise<number>;
  patch(obj: T): Promise<number>;
  delete(id: string): Promise<number>;
}

export class CRUDRepository<T> implements ICRUDRepository<T> {
  constructor(table: string) {
    this.load = this.load.bind(this)
    this.insert = this.insert.bind(this)
    this.update = this.update.bind(this)
    this.patch = this.patch.bind(this)
    this.delete = this.delete.bind(this)
  }
    load(id: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
    insert(obj: T): Promise<number> {
        throw new Error("Method not implemented.");
    }
    update(obj: T): Promise<number> {
        throw new Error("Method not implemented.");
    }
    patch(obj: T): Promise<number> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
}
