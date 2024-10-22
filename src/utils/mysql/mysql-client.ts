import {
  Pool,
  QueryResult,
  RowDataPacket,
  ResultSetHeader,
} from "mysql2/promise";
import { Model } from "../model-validator/model";

export class MySQLClient {
  constructor(private pool: Pool) {
    this.query = this.query.bind(this);
    this.execute = this.execute.bind(this);
  }

  async query<T>(
    qr: string,
    ...args: any[]
  ): Promise<T | null> {
    const connection = await this.pool.getConnection();
    const [rows] = await connection.query<RowDataPacket[]>(qr, args);
    if (rows.length == 0) {
      return null;
    }
    return rows[0] as T;
  }

  async execute(qr: string, ...args: any[]): Promise<number> {
    try {
      const connection = await this.pool.getConnection();
      console.log(qr, args);
      const res = await connection.execute<ResultSetHeader>(qr, args);
      return res[0].affectedRows;
    } catch (error) {
      throw error;
    }
  }
}
