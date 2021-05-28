const express = require('express');
const bodyParser = require('body-parser');
const userRouter = express.Router();
const User = require('../models/userModel');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

userRouter.use(bodyParser.json());

/* GET users listing. */
userRouter.post('/add', async (req, res, next) => {
    try {
        const userExist = await User.findOne({ email: req.body.email });

        if (userExist) {
            return next(createError(403, 'User exists!'));
        }

        const user = new User({
            email: req.body.email,
            password: req.body.password,
            library: req.body.library,
        });

        await user.save();
        res.status(201).send({ message: 'User registered!' });
    } catch (e) {
        next(e);
    }
});

userRouter.post('/login', async (req, res, next) => {
    try {
        if (!req.body.email && !req.body.password) {
            return next(
                createError(403, 'Email and password fields are required!')
            );
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(createError(404, 'User not found'));
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return next(createError(403, 'Incorrect password'));
        }

        const token = jwt.sign(
            { _id: user._id.toString() },
            process.env.JWT_SECRET
        );

        user.password = undefined;

        res.status(200).send({ user, token });
    } catch (e) {
        next(e);
    }
});

module.exports = userRouter;
