import React, { useState } from 'react';
import axios from '../api';

const EditBook = ({book, editBook}) => {
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const publisher = document.getElementById('publisher').value;
        const note = document.getElementById('note').value;

        axios
            .patch(
                '/books/' + book._id,
                {
                    title,
                    author,
                    publisher,
                    note,
                },
                {
                    validateStatus: () => true,
                }
            )
            .then((res) => {
                if (res.status === 201) {
                    setError('Knjiga je uspesno izmenjena!');
                    const newBook = {
                        title, 
                        author,
                        publisher,
                        note
                    }
                    editBook(newBook);
                } else {
                    setError('Polja naslov, autor i izdavac su obavezna');
                }
            });
    };

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    name="title"
                    id="title"
                    defaultValue={book.title}
                />
                <input
                    type="text"
                    name="author"
                    id="author"
                    defaultValue={book.author}
                />
                <input
                    type="text"
                    name="publisher"
                    id="publisher"
                    defaultValue={book.publisher}
                />
                <input
                    type="text"
                    name="note"
                    id="note"
                    defaultValue={book.note}
                />
                <button type="submit" value="Submit">
                    Posalji
                </button>
            </form>
            {error}
        </div>
    );
};

export { EditBook as default };
