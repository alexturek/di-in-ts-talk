import * as _ from 'lodash';

import { Band, Musician } from './types';
import { db } from './database';

export async function findBandsWith(name: string): Promise<Musician[][]> {
  // we only look at adults
  const musicians = await db.getMusiciansLike({ name, age: { $gte: 18 }});
  const bands = _.groupBy(musicians, 'bandId');
  return _.values(bands);
}

export async function startBand(bandName: string, musicianNames: string[]): Promise<[Band, Musician[]]> {
  let band: Band;
  let users: Musician[];
  await db.withTransaction(async () => {
    band = await db.createBand({ name: bandName });
    for (const name of musicianNames) {
      users.push(await db.createMusician({ name }));
    }
  });
  return [band, users];
}
