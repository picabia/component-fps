import { FpsCanvas } from '../../src/components/fps-canvas';

import { expect } from 'chai';

describe('FpsCanvas', function () {
  describe('contructor()', function () {
    it('should be a function', function () {
      expect(FpsCanvas).to.be.a('function');
    });
  });
});
