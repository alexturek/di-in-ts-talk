import { Band, Musician } from './types';
import * as library from './library';
import * as config from './config';
import { Database } from './database';

async function main() {
  const database = new Database(config.db);
  const server = buildServer(database);
  server.listenForever(80);
}

function buildServer(db: Database) {
  const server: any = null;
  server.post('/start-band', async (req: any, res: any) => {
    const wilburys = await library.findBandsWith(db, 'bob dylan');
    if (!wilburys) {
      await library.startBand(db, 'heartbreakers', ['tom petty']);
    }
    res.status(200).end();
  });
  return server;
}

main();
