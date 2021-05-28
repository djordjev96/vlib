const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bookRouter = require('./routes/book');

const app = express();
app.use(cors());

mongoose.connect(
    'mongodb+srv://' +
        process.env.ATLAS_USER +
        ':' +
        process.env.ATLAS_PW +
        '@cluster0.uwyvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', bookRouter);
app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        error: {
            message: err.message,
            status: statusCode,
        },
    });
});

module.exports = app;
