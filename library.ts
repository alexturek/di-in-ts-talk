import * as _ from 'lodash';

import { Band, Musician } from './types';
import { Database } from './database';

export class Library {
  constructor(readonly database: Database) {}

  async findBandsWith(name: string): Promise<Musician[][]> {
    // we only look at adults
    const users = await this.database.getMusiciansLike({ name, age: { $gte: 18 }});
    const bands = _.groupBy(users, 'bandId');
    return _.values(bands);
  }

  async startBand(bandName: string, musicianNames: string[]): Promise<[Band, Musician[]]> {
    let band: Band;
    let users: Musician[];
    await this.database.withTransaction(async (database:Database) => {
      band = await database.createBand({ name: bandName });
      for (const name of musicianNames) {
        users.push(await database.createMusician({ name }));
      }
    });
    return [band, users];
  }
}
