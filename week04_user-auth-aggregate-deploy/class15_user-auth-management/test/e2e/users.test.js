const dropCollection = require('./db');
const User = require('../../lib/models/User');
const app = require('../../lib/app');
const request = require('supertest');
const bcrypt = require('bcryptjs');
const Chance = require('chance');
const chance = new Chance();


describe('user routes', () => {
    const users = Array.apply(null, { length: 1 })
        .map(() => ({ name: chance.name(), clearPassword: chance.word(), email: chance.email() }));

    let createdUsers;

    const createUser = user => {
        return User.create(user);
    };

    beforeEach(() => {
        return dropCollection('users');
    });

    beforeEach(() => {
        return Promise.all(users.map(createUser))
            .then(cs => {
                createdUsers = cs;
            });
    });

    it('hashes a users password', () => {
        return User.create({
            name: 'ryan',
            clearPassword: 'testing1234',
            email: 'ryan@test.com'
        }).then(user => {
            expect(user.clearPassword).not.toEqual('testing1234');
            expect(bcrypt.compareSync('testing1234', user.passwordHash));
        });
    });

    it('creates a user on signup', () => {
        return request(app)
            .post('/api/auth/signup')
            .send({ name: 'ryan', email: 'ryan@ryan.com', clearPassword: 'testing1234' })
            .then(({ body: user }) => {
                // const user = res.body
                expect(user).toEqual({ _id: expect.any(String), name: 'ryan', email: 'ryan@ryan.com' });
            });
    });

    // it('compares passwords', () => {
    //     const validPassword = users[0].password;
    //     const invalidPassword = `${validPassword}1234`;

    //     const validCompare = createdUsers[0].compare(validPassword);
    //     const invalidCompare = createdUsers[0].compare(invalidPassword);

    //     expect(validCompare).toBeTruthy();
    //     expect(invalidCompare).toBeFalsy();
    // });

    // it('creates an auth token', () => {
    //     return createdUsers[0].authToken()
    //         .then(token => {
    //             expect(token).toEqual(expect.any(String));
    //             return token;
    //         })
    //         .then(token => {
    //             return User.verifyToken(token).then(user => {
    //                 expect(user).toEqual({});
    //             });
    //         });
    // });
});
