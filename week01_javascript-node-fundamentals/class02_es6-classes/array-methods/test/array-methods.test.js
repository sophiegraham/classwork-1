const assert = require('assert');
const List = require('../lib/array-methods')

describe('some', () => {

    const isEven = item => {
        return item % 2 === 0;
    }

    describe('array method assumptions', () => {
        it('returns true if an item in the array pass the test', () => {
            const numbers = [1, 2, 3];
            const hasEvens = numbers.some(item => {
                return isEven(item)
            })

            assert.equal(hasEvens, true)
        });

        it('returns false if no item in the array passes the test', () => {
            const numbers = [1, 3, 5];
            const hasEvens = numbers.some(item => {
                return isEven(item);
            });
            
            assert.equal(hasEvens, false)
        });

        it('returns early once finds a match', () => {
            const numbers = [1, 2, 4, 6]
            let called = []
            numbers.some(item => {
                called.push(item);
                return isEven(item)
            })

            assert.deepEqual(called, [1, 2]);
        })
    });

    it('returns true if an item in the list pass the test', () => {
        const list = new List([1, 2, 3]);
        const hasEvens = list.some(item => {
            return isEven(item)
        })

        assert.equal(hasEvens, true)
    });

    it('returns false if no item in the list passes the test', () => {
        const list = new List([1, 3, 5]);
        const hasEvens = list.some(item => {
            return isEven(item);
        });
        
        assert.equal(hasEvens, false)
    });

    it('returns early once finds a match', () => {
        const list = new List([1, 2, 4, 6])
        let called = []
        list.some(item => {
            called.push(item);
            return isEven(item)
        })

        list.some(item => {
            called.push(item);
            return isOdd(item)
        })

        assert.deepEqual(called, [1, 2]);
    })

});
