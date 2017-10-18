import * as _ from 'lodash';

import { Band, Musician, StringMap } from './types';

function createConnectionPool(...args: any[]): any {}

export class Database {
  public currentConnection: any = null;
  private connectionPool: any = null;

  constructor(url: string | any) {
    this.connectionPool = createConnectionPool(url);
    if (!_.isString(url)) {
      this.currentConnection = url;
    } else {
      this.currentConnection = this.connectionPool.newConn();
    }
  }

  async withTransaction(innerQueries: (db: Database) => Promise<any>): Promise<void> {
    const transaction = this.connectionPool.transaction();
    const db: Database = new Database(transaction);
    try {
      await innerQueries(db);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  }

  async getMusiciansLike(constraints: StringMap): Promise<Musician[]> {
    return await this.currentConnection.query(`SELECT * FROM musicians WHERE ?`, constraints);
  }

  async createBand(companyData: StringMap): Promise<Band> {
    this.currentConnection.currentConnectionection;
    return await this.currentConnection.query(`INSERT INTO bands ?`, companyData);
  }

  async createMusician(userData: StringMap): Promise<Musician> {
    this.currentConnection.currentConnectionection;
    return await this.currentConnection.query(`INSERT INTO musicians ?`, userData);
  }
}
