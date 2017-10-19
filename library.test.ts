import * as library from './library';

import { Band, Musician } from './types';
import { Database } from './database';

describe(`library`, () => {
  describe(`findBandsWith`, () => {
    let fakeDb: Database & sinon.StubInstance<Database>;
    beforeEach(() => {
      fakeDb = sinon.stubInstance(Database);
      fakeDb.getMusiciansLike.resolves([{
        name: 'Roy',
        age: 42,
        bandId: 'a',
      }, {
        name: 'George',
        age: 53,
        bandId: 'a',
      }]);
    });

    it(`queries for musicians that are >= 18`, async () => {
      await library.findBandsWith(fakeDb, 'Somebody');
      expect(fakeDb.getMusiciansLike).to.have.been.calledWithMatch({
        age: { $gte: sinon.match.atleast(18) } });
      });
    });
  });
});
