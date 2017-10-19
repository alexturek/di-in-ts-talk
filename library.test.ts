import * as library from './library';

import { Band, Musician } from './types';
import { db } from './database';

describe(`library`, () => {
  describe(`findBandsWith`, () => {
    beforeEach(() => {
      sinon.stub(db, 'getMusiciansLike').resolves([{
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
      await library.findBandsWith('Somebody');
      expect(db.getMusiciansLike).to.have.been.calledWithMatch({
        age: { $gte: sinon.match.atleast(18) } });
      });
    });
  });
});
