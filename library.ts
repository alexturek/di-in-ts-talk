import * as _ from 'lodash';

import { Band, Musician } from './types';
import { Database } from './database';

export async function findBandsWith(database: Database, name: string): Promise<Musician[][]> {
  // we only look at adults
  const users = await database.getMusiciansLike({ name, age: { $gte: 18 }});
  const bands = _.groupBy(users, 'bandId');
  return _.values(bands);
}

export async function startBand(database: Database, bandName: string, musicianNames: string[]): Promise<[Band, Musician[]]> {
  let band: Band;
  let users: Musician[];
  await database.withTransaction(async () => {
    band = await database.createBand({ name: bandName });
    for (const name of musicianNames) {
      users.push(await database.createMusician({ name }));
    }
  });
  return [band, users];
}
