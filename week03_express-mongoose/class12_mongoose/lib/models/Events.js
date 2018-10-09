const { db } = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Events {
    create(event) {
        return db('events')
            .then(collection => {
                return collection.insertOne(event);
            })
            .then(results => results.ops[0]);
    }
    
    getAll() {
        return db('events')
            .then(collection => {
                return collection.find();
            })
            .then(results => results.toArray());
    }

    get(id) {
        return db('events').then(collection => {
            return collection.findOne({ _id: ObjectId(id) });
        });
    }
}

module.exports = new Events();
