const { ObjectId } = require('mongodb');

class Tweets {
    constructor(db) {
        this.db = db;
    }
    insert(tweet) {
        return this.db('tweets').then(collection => {
            return collection
                .insertOne(tweet)
                .then(result => result.ops[0]);
        });
    }

    findById(id) {
        return this.db('tweets').then(collection => collection.findOne({ _id: ObjectId(id) }));
    }

    find(query) {
        return this.db('tweets').then(collection => collection.find(query).toArray());
    }

    update(tweet) {
        const id = { _id: ObjectId(tweet._id) };
        delete tweet._id;

        const action = { $set: tweet };
        const returnResult = { returnOriginal: false };

        return this.db('tweets')
            .then(collection => {
                return collection.findOneAndUpdate(id, action, returnResult);
            })
            .then(result => result);
    }

    remove(id) {
        return this.db('tweets').then(collection => collection.removeOne({ _id: ObjectId(id) }));
    }
}

module.exports = Tweets;
