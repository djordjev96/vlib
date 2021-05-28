const jwt = require('jsonwebtoken');
const User = require('./models/userModel');

exports.verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded._id });

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        e.status = 401;
        if (e.message !== 'jwt expired') {
            e.message = 'not authorized';
        }
        next(e);
    }
};