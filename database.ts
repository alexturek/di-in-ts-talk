import * as config from './config';
import { Band, Musician, StringMap } from './types';

export class Database {
  constructor(readonly url: string) {}

  async getMusiciansLike(constraints: StringMap): Promise<Musician[]> {
    const conn = await getConnection();
    return await conn.query(`SELECT * FROM musicians WHERE ?`, constraints);
  }

  async createBand(companyData: StringMap): Promise<Band> {
    const conn = await getConnection();
    return await conn.query(`INSERT INTO bands ?`, companyData);
  }

  async createMusician(userData: StringMap): Promise<Musician> {
    const conn = await getConnection();
    return await conn.query(`INSERT INTO musicians ?`, userData);
  }

  async withTransaction(innerQueries: () => Promise<any>) {
    CLS.getContext().transaction = await newTransaction();
    await innerQueries();
    await CLS.getContext().transaction.commit();
    delete CLS.getContext().transaction;
  }
}

// A global per-process variable
export const db: Database = new Database(config.db);

async function newTransaction(): Promise<any> {}
function getConnection(): any {
  const transaction = CLS.getContext().transaction;
  if (transaction) {
    return transaction;
  }
  return 'a connection';
}

// Our attempt to store context across JS events
const CLS: any = null;
