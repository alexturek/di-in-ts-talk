import { Band, Musician } from './types';
import { Library } from './library';
import * as config from './config';
import { Database } from './database';

async function main() {
  const database = new Database(config.db);
  const library = new Library(database);
  const server = buildServer(library);
  server.listenForever(80);
}

function buildServer(library: Library) {
  const server: any = null;
  server.post('/start-band', async (req: any, res: any) => {
    const wilburys = await library.findBandsWith('bob dylan');
    if (!wilburys) {
      await library.startBand('heartbreakers', ['tom petty']);
    }
    res.status(200).end();
  });
  return server;
}

main();
