const assert = require('assert');
const CoolStringifier = require('../lib/cool-stringifier');

describe.only('cool stringifier', () => {
    let stringifier;

    beforeEach(() => {
        stringifier = new CoolStringifier('There we go');
    });

    it('getWords gets the array of words from sentence', () => {
        const words = stringifier.getWords();
        assert.deepEqual(words, ['There', 'we', 'go']);
    });

    it('reverseWords reverses words in sentence', () => {
        stringifier.reverseWords();
        assert.equal(stringifier.sentence, 'go we There');
    });

    it('reverseLetters reverses letters in sentence', () => {
        stringifier.reverseLetters();
        assert.equal(stringifier.sentence, 'erehT ew og');
    });
});
