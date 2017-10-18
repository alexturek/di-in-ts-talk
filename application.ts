import { Band, Musician } from './types';
import * as library from './library';

async function main() {
  const server = buildServer();
  server.listenForever(80);
}

function buildServer() {
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
