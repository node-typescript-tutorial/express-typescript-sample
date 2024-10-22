import { MySQLClient } from "./mysql/mysql-client";
import { Model, ModelProp } from "./model-validator/model";

export interface ICRUDRepository<T> {
  load(id: string): Promise<T | null>;
  insert(obj: T): Promise<number>;
  update(obj: T, id: string): Promise<number>;
  patch(obj: T, id: string): Promise<number>;
  delete(id: string): Promise<number>;
}

export class CRUDRepository<T extends Record<string, any>>
  implements ICRUDRepository<T>
{
  private keys: string[] = [];
  private cols: string[] = [];
  constructor(
    protected table: string,
    protected mySQLClient: MySQLClient,
    protected model: Model
  ) {
    this.load = this.load.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.patch = this.patch.bind(this);
    this.delete = this.delete.bind(this);
    this.setCols = this.setCols.bind(this);
    this.buildToInsert = this.buildToInsert.bind(this);
    this.buildToUpdate = this.buildToUpdate.bind(this);
    this.setCols(model);
  }

  async load(id: string): Promise<T | null> {
    try {
      const qr = `select * from ${this.table} where ${this.keys[0]} = ?`;
      const res = await this.mySQLClient.query<T>(qr, id);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async insert(obj: T): Promise<number> {
    try {
      const [qr, vals] = this.buildToInsert(obj);
      const res = await this.mySQLClient.execute(qr, vals);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async update(obj: T, id: string): Promise<number> {
    try {
      const [qr, vals] = this.buildToUpdate(obj, id);
      const res = await this.mySQLClient.execute(qr, vals);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async patch(obj: T, id: string): Promise<number> {
    try {
      const [qr, vals] = this.buildToPatch(obj, id);
      const res = await this.mySQLClient.execute(qr, vals);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<number> {
    try {
      let buildWhere = "where";
      const vals: any[] = [];
      let qr = `delete from ${this.table} where ${this.keys[0]} = ${id}`;
      const res = await this.mySQLClient.execute(qr, vals);
      return res;
    } catch (error) {
      throw error;
    }
  }

  private setCols(model: Model): void {
    const ks = Object.keys(model);
    ks.forEach((props) => {
      if (model[props].column) {
        this.cols.push(model[props].column);
        if (model[props].primaryKey) {
          this.keys.push(model[props].column);
        }
      }
    });
  }

  private buildParams(n: number) {
    let s = "(";
    for (let i = 0; i < n; i++) {
      s = s + " ?,";
    }
    return s.slice(0, -1);
  }

  private buildToInsert(model: T): [string, any[]] {
    const qr = `insert into ${this.table}(${this.cols.join(
      ", "
    )}) values (${this.buildParams(this.cols.length)})`;

    const vals: any[] = [];
    this.cols.forEach((col) => {
      vals.push(model[col as keyof object]);
    });

    return [qr, vals];
  }

  private buildToUpdate(
    model: Record<string, any>,
    id: string
  ): [string, any[]] {
    let buildSet = "";
    let buildWhere = "";
    const vals: any[] = [];

    this.cols.forEach((col) => {
      buildSet = buildSet + ` ${col} = ?,`;
      vals.push(model[col]);
    });
    buildSet = buildSet + " 1 = 1";

    buildWhere = buildWhere + ` ${this.keys[0]} = ?`;
    vals.push(id);
    const qr = `update ${this.table} set ${buildSet} where ${buildWhere}`;
    return [qr, vals];
  }

  private buildToPatch(obj: Record<string, any>, id: string): [string, any[]] {
    let buildSet = "";
    let buildWhere = "";
    const vals: any[] = [];

    Object.keys(obj).forEach((col) => {
      buildSet = buildSet + ` ${col} = ?,`;
      vals.push(obj[col]);
    });
    buildSet = buildSet.slice(0, -1);

    buildWhere = buildWhere + ` ${this.keys[0]} = ?`;
    vals.push(id);

    const qr = `update ${this.table} set ${buildSet} where ${buildWhere}`;

    return [qr, vals];
  }
}
