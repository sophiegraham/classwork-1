const md5 = require('md5');

const hash = password => {
    return md5(password);
};

const compare = (password, hashedPassword) => {
    return md5(password) === hashedPassword;
};

module.exports = {
    hash,
    compare
};
