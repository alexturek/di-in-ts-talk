import { Band, Musician } from './types';
import { Database } from './database';

describe(`library`, () => {
  describe(`findBandsWith`, () => {
    beforeEach(() => {
      sinon.stub(Database.prototype, 'getMusiciansLike').resolves([{
        name: 'Roy',
        age: 42,
        bandId: 'a',
      }, {
        name: 'George',
        age: 53,
        bandId: 'a',
      }]);
    });

    it(`only looks at musicians who are 18 or older`, () => {
      expect(database.getMusiciansLike).to.have.been.calledWithMatch({
        age: { $gte: sinon.match.atleast(18) } });
      });
    });

    it(`returns musicians grouped by band id`, () => {
      database.getMusiciansLike.resolves([])
    });
  });
});
