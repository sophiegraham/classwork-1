const { sign, decode } = require('jsonwebtoken');
const APP_SECRET = 'some_password';

const tokenize = payload => {
    return sign({ payload }, APP_SECRET, { expiresIn: '1h' });
};

const untokenize = token => {
    return decode(token);
};

module.exports = {
    tokenize,
    untokenize
};

