import { FpsDom } from '../../src/components/fps-dom';

import { expect } from 'chai';

describe('FpsDom', function () {
  describe('contructor()', function () {
    it('should be a function', function () {
      expect(FpsDom).to.be.a('function');
    });
  });
});
