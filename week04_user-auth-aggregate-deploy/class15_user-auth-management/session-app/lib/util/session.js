const uuid = require('uuid/v4');

const sessions = {};

const getSession = sessionId => {
    return sessions[sessionId];
};

const setSession = payload => {
    const sessionId = uuid();

    sessions[sessionId] = payload;

    return sessionId;
};

module.exports = {
    getSession,
    setSession
};
