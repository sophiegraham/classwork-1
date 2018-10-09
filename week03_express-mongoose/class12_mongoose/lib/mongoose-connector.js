const { parse } = require('url');
const mongoose = require('mongoose');

const redactURLAuth = url => {
    const parsedUrl = parse(url);
    const redactedAuth = parsedUrl.auth ? '***:***@' : '';
    return `${parsedUrl.protocol}://${redactedAuth}${parsedUrl.hostname}:${parsedUrl.port}${parsedUrl.path}`;
};

const log = (event, url) => () => console.log(`${event.toUpperCase()}: Mongo at ${url}`);

module.exports = (connectionUrl = process.env.MONGODB_URI) => {
    const safeConnectionUrl = redactURLAuth(connectionUrl);

    mongoose.connect(connectionUrl, { useNewUrlParser: true });

    mongoose.connection.on('open', log('open', safeConnectionUrl));

    mongoose.connection.on('error', log('error', safeConnectionUrl));

    mongoose.connection.on('close', log('close', safeConnectionUrl));
};
