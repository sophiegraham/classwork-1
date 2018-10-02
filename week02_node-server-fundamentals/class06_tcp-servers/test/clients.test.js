const assert = require('assert');
const Clients = require('../lib/clients');

describe('Clients', () => {
    let clients = null;
    let c1;
    let c2;
    let c3;
    beforeEach(() => {
        clients = new Clients();
        c1 = clients.add({});
        c2 = clients.add({});
        c3 = clients.add({});
    });

    it('assigns names', () => {
        assert.equal(c1.username, 'user1');
        assert.equal(c2.username, 'user2');
        assert.equal(c3.username, 'user3');
    });

    it('remove a client', () => {
        clients.remove(c1);
        assert(!clients.set.has(c1));
    });

    it('gets all clients', () => {
        const expectedClients = [c1, c2, c3];
        const allClients = clients.getAllClients();

        assert.deepEqual(allClients, expectedClients);
    });

    it('gets all clients except self', () => {
        const broadcastClients = clients.getBroadcastClients(c1);
        assert.deepEqual(broadcastClients, [c2, c3]);
    });

    
});


// assert.equal(c1.username, 'user1');
// assert.equal(c2.username, 'user2');
// assert.equal(c3.username, 'user3');

// it('stores clients', () => {
//     const allClients = clients.getAllClients();
//     assert.deepEqual(allClients, [c1, c2, c3]);
// });

// it('removes a client', () => {
//     clients.remove(c2);
//     const allClients = clients.getAllClients();
//     assert.deepEqual(allClients, [c1, c3]);

// });

// it('gives back list of clients (minus sender)', () => {
//     const broadcast = clients.getBroadcastClients(c1);
//     assert.deepEqual(broadcast, [c2, c3]);
// });
