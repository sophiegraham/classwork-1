const router = require('express').Router();
const User = require('../models/User');

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
            if(correctPassword) res.status(200);
            else res.status(401);
            res.end();
        });
    });
