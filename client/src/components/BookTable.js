import React, {useContext} from 'react';
import BookRow from './BookRow';
import BookContext from '../booksContext';

const BookTable = ({searchInput, numOfBooksFound, error }) => {
    const rows = [];

    const {books} = useContext(BookContext);

    if (books) {
        books.forEach((book) => {
            if (
                book.title.toLowerCase().indexOf(searchInput.toLowerCase()) ===
                    -1 &&
                book.author.toLowerCase().indexOf(searchInput.toLowerCase()) ===
                    -1 &&
                book.publisher
                    .toLowerCase()
                    .indexOf(searchInput.toLowerCase()) === -1
            ) {
                return;
            }
            rows.push(
                <BookRow
                    book={book}
                    key={book._id}
                />
            );
        });
    }

    return (
        <div>
            {error || searchInput === '' ? (
                error
            ) : (
                <div>
                    Pronadjeno knjiga: {numOfBooksFound}
                    <table>
                        <thead>
                            <tr>
                                <th>Naslov</th>
                                <th>Autor</th>
                                <th>Izdavač</th>
                                <th>Napomena</th>
                                <th>Akcija</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export { BookTable as default };
