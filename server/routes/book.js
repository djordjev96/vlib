const express = require('express');
const bodyParser = require('body-parser');
const bookRouter = express.Router();
const Book = require('../models/bookModel');
const createError = require('http-errors');
const {verifyUser} = require('../authorization');

bookRouter.use(bodyParser.json());

/* GET books listing. */
bookRouter.get('/', verifyUser, async (req, res, next) => {
    try {
        const numOfBooks = await Book.find({}).countDocuments();
        let books = [];
        if (req.query.searchInput) {
            const searchInput = req.query.searchInput
                ? req.query.searchInput
                : '';
            books = await Book.find({
                $or: [
                    { title: { $regex: searchInput, $options: 'i' } },
                    { author: { $regex: searchInput, $options: 'i' } },
                    { publisher: { $regex: searchInput, $options: 'i' } },
                ],
            });

            if (!books.length) {
                return next(createError(404));
            }
            return res.status(200).send({numOfBooks, books});
        }

        return res.status(200).send({numOfBooks, books});
    } catch (e) {
        next(e);
    }
});

bookRouter.post('/', verifyUser, async (req, res, next) => {
    if (!req.body.title && !req.body.author && !req.body.publisher) {
        return next(createError(403, 'You must fill all fields!'));
    }

    try {
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            note: req.body.note,
        });

        await book.save();
        return res.status(201).send('New book added!');
    } catch (e) {
        next(e);
    }
});

bookRouter.get('/:bookId', verifyUser, async (req, res, next) => {
    try {
        const book = await Book.findOne({_id: req.params.bookId});
    
        if (!book) {
            return next(createError(404));
        }

        return res.status(200).send(book);
    } catch (e) {
        next(e);
    }
});

bookRouter.patch('/:bookId', verifyUser, async (req, res, next) => {
    
    try {
        const book = await Book.findOne({_id: req.params.bookId});
    
        if (!book) {
            return next(createError(404));
        }
        const updates = Object.keys(req.body);
        console.log(updates);
        const allowedUpdates = ['title', 'author', 'note', 'publisher'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return next(createError(403, 'Invalid updates'));
        }

        updates.forEach((update) => (book[update] = req.body[update]));

        await book.save();

        return res.status(201).send({message: 'Updated!', book});
    } catch (e) {
        next(e);
    }
});

bookRouter.delete('/:bookId', verifyUser, async (req, res, next) => {
    try {
        const book = await Book.findOne({_id: req.params.bookId});
    
        if (!book) {
            return next(createError(404));
        }

        await book.deleteOne();
        res.status(200).send({message: 'Book deleted!'});
    } catch (e) {
        next(e);
    }
})

module.exports = bookRouter;
