import React, { useState, useContext } from 'react';
import numOfBooksContext from '../numOfBooksContext';
import axios from '../api';

const AddBook = () => {
    const [error, setError] = useState('');
    const {numOfBooks, setNumOfBooks} = useContext(numOfBooksContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const publisher = document.getElementById('publisher').value;
        const note = document.getElementById('note').value;

        axios
            .post(
                '/books',
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
                    setError('Knjiga je uspesno dodata!');
                    setNumOfBooks(numOfBooks + 1);
                    document.getElementById('addBook').reset();
                } else {
                    setError('Polja naslov, autor i izdavac su obavezna');
                }
            });
    };

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)} id='addBook'>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Naslov knjige"
                />
                <input
                    type="text"
                    name="author"
                    id="author"
                    placeholder="Autor knjige"
                />
                <input
                    type="text"
                    name="publisher"
                    id="publisher"
                    placeholder="Izdavac"
                />
                <input
                    type="text"
                    name="note"
                    id="note"
                    placeholder="Napomena"
                />
                <button type="submit" value="Submit">
                    Posalji
                </button>
            </form>
            {error}
        </div>
    );
};

export { AddBook as default };
