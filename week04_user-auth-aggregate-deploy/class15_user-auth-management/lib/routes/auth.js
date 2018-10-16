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
    });
