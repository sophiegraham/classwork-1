const { getErrors } = require('./helpers');
const Event = require('../../lib/models/Event');
const Chance = require('chance');
const chance = new Chance();

describe('Events model', () => {
    it('validates a good model', () => {
        const data = {
            type: 'purchase',
            customerId: chance.guid(),
            purchaseId: chance.guid(),
            publishedAt: chance.date()
        };

        const event = new Event(data);
        const jsonEvent = event.toJSON();
        expect(jsonEvent).toEqual({ ...data, _id: expect.any(Object) });
    });

    it('requires an event type', () => {
        const event = new Event({
            purchaseId: chance.guid(),
            customerId: chance.guid(),
            publishedAt: chance.date()
        });

        const errors = getErrors(event.validateSync(), 1);
        expect(errors.type.properties.message).toEqual('Path `type` is required.');
    });

    it('requires an event customerId', () => {
        const event = new Event({
            type: 'purchase',
            purchaseId: chance.guid(),
            publishedAt: chance.date()
        });

        const errors = getErrors(event.validateSync(), 1);
        expect(errors.customerId.properties.message).toEqual('Path `customerId` is required.');
    });

    it('requires an event customerId', () => {
        const event = new Event({
            type: 'purchase',
            customerId: chance.guid(),
            publishedAt: chance.date()
        });

        const errors = getErrors(event.validateSync(), 1);
        expect(errors.purchaseId.properties.message).toEqual('Path `purchaseId` is required.');
    });

    it('requires an event publishedAt', () => {
        const event = new Event({
            type: 'purchase',
            customerId: chance.guid(),
            purchaseId: chance.guid()
        });

        const errors = getErrors(event.validateSync(), 1);
        expect(errors.publishedAt.properties.message).toEqual('Path `publishedAt` is required.');
    });
});
