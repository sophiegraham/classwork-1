const uuid = require('uuid/v4');

module.exports = class Tweet {
    constructor(username, text) {
        this.id = uuid();
        this.username = username;
        this.text = text;
    }
};
