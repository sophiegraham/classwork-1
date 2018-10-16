const mongoose = require('mongoose');
const { hash, compare } = require('../util/hashing');
const { tokenizer } = require('../util/tokenizer');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    passwordHash: String
}, {
    toJSON: {
        transform: function(doc, ret) {
            delete ret.__v;
            delete ret.passwordHash;
        }
    }
});

userSchema.virtual('clearPassword').set(function(password) {
    this._tempPassword = password;
});

userSchema.pre('save', function(next) {
    this.passwordHash = hash(this._tempPassword);
    next();
});

userSchema.methods.compare = function(clearPassword) {
    return compare(clearPassword, this.passwordHash);
};

userSchema.methods.authToken = function() {
    const jsonUser = this.toJSON();
    return tokenizer(jsonUser);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
