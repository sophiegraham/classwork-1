const router = require('express').Router();
const User = require('../models/User');
const { HttpError } = require('../util/errors');

module.exports = router
    .post('/signup', (req, res, next) => {
        const { name, email, clearPassword } = req.body;
        User.create({
            name,
            email,
            clearPassword
        }).then(user => {
            res.json(user);
        });
    })

    .post('/signin', (req, res, next) => {
        const { email, clearPassword } = req.body;
        User.findOne({ email }).then(user => {
            // user === null
            const correctPassword = user && user.compare(clearPassword);
            if(correctPassword) {
                // should send token back
                const token = user.authToken();
                res.json({ token });
            } else {
                next(new HttpError({
                    code: 401,
                    message: 'Bad email or password'
                }));
            }
        });
    })

    .get('/verify', (req, res, next) => {
        const token = req.get('Authorization').replace('Bearer ', '');
        User.findByToken(token).then(user => {
            res.json({ success: !!user });
        });
    });
