const router = require('express').Router();
const User = require('../models/User');
const { setSession, getSession } = require('../util/session');
const { HttpError } = require('../util/errors');

module.exports = router
    .post('/signup', (req, res, next) => {
        const { name, email, clearPassword } = req.body;
        User.create({
            name,
            email,
            clearPassword
        })
            .then(user => {
                res.json(user);
            })
            .catch(next);
    })

    .post('/signin', (req, res, next) => {
        const { email, clearPassword } = req.body;
        User.findOne({ email }).then(user => {
            // user === null
            const correctPassword = user && user.compare(clearPassword);
            if(correctPassword) {
                const sessionId = setSession(user);
                res.cookie('sessionId', sessionId);
                res.end();
            }
            else {
                next(new HttpError({ code: 401, message: 'Bad email or password' }));
            }
        });
    })

    .get('/verify', (req, res, next) => {
        const sessionId = req.headers.cookie.replace('sessionId=', '');
        const user = getSession(sessionId);
        console.log(user);
        res.json(user);
    });
