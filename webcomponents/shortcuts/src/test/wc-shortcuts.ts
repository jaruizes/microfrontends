import {ShortCutsElement} from '../wc-shortcuts.js';

const assert = chai.assert;

suite('wc-shorcuts', () => {
  test('is defined', () => {
    const el = document.createElement('wc-shortchuts');
    assert.instanceOf(el, ShortCutsElement);
  });
});
