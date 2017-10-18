import * as config from './config';
import { Band, Musician, StringMap } from './types';

export class Database {
  constructor(readonly url: string) {}
}

// A global per-process variable
export const db: any = new Database(config.db);

// Our attempt to store context across JS events
const CLS: any = null;

export async function withTransaction(innerQueries: () => Promise<any>) {
  CLS.getContext().transaction = await db.newTransaction();
  await innerQueries();
  await CLS.getContext().transaction.commit();
  delete CLS.getContext().transaction;
}

function getConnection() {
  const transaction = CLS.getContext().transaction;
  if (transaction) {
    return transaction;
  }
  return db.newConn();
}

export async function getMusiciansLike(constraints: StringMap): Promise<Musician[]> {
  const conn = await getConnection();
  return await conn.query(`SELECT * FROM musicians WHERE ?`, constraints);
}

export async function createBand(companyData: StringMap): Promise<Band> {
  const conn = await getConnection();
  return await conn.query(`INSERT INTO bands ?`, companyData);
}

export async function createMusician(userData: StringMap): Promise<Musician> {
  const conn = await getConnection();
  return await conn.query(`INSERT INTO musicians ?`, userData);
}
