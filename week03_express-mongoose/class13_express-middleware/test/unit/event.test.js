const { getErrors } = require('./helpers');
const Event = require('../../lib/models/Event');
const Chance = require('chance');
const chance = new Chance();

describe('Events model', () => {
    it('validates a good model', () => {
        const data = {
            type: 'purchase',
            customerId: chance.guid(),
            purchaseId: chance.guid()
        };

        const event = new Event(data);
        const jsonEvent = event.toJSON();
        expect(jsonEvent).toEqual({ ...data, _id: expect.any(Object) });
    });

    it('event type is required', () => {
        const event = new Event({
            purchaseId: chance.guid(),
            customerId: chance.guid()
        });

        const errors = getErrors(event.validateSync(), 1);
        expect(errors.type.properties.message).toEqual('Path `type` is required.');
    });
});
