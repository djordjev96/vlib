import React, { useState, useEffect } from 'react';
import SearchBook from './SearchBook';
import BookTable from './BookTable';
import axios from '../api';
import BooksContext from '../booksContext';

const FilterableBookTable = () => {
    const [searchInput, setSearchInput] = useState('');
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [numOfBooksFound, setNumOfBooksFound] = useState(0);

    useEffect(() => {
        setNumOfBooksFound(0);
        if (searchInput.length >= 3) {
            axios
                .get('/books?searchInput=' + searchInput, {
                    validateStatus: () => true,
                })
                .then((res) => {
                    if (res.status === 404) {
                        setError('Knjiga nije pronadjena');
                    } else if (!res.status || res.status >= 500) {
                        setError('Greska na serveru');
                    } else {
                        const books = res.data.books;
                        setBooks(books);
                        setError('');
                        setNumOfBooksFound(books.length);
                    }
                })
                .catch((error) => console.log(error));
        }
    }, [searchInput]);

    const handleSearchInputChange = (searchInput) => {
        setSearchInput(searchInput);
    };

    return (
        <div>
            <SearchBook
                searchInput={searchInput}
                onSearchInputChange={handleSearchInputChange}
            />
            <BooksContext.Provider value={{ books, setBooks }}>
                <BookTable searchInput={searchInput} numOfBooksFound={numOfBooksFound} error={error} />
            </BooksContext.Provider>
        </div>
    );
};

export { FilterableBookTable as default };
