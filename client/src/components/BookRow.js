import React, { useState, useContext } from 'react';
import axios from '../api';
import numOfBooksContext from '../numOfBooksContext';
import BookContext from '../booksContext';
import EditBook from './EditBook';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        border: '1px solid #ccc',
        background: '#fff',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
    },
};

const BookRow = ({ book }) => {
    const {numOfBooks, setNumOfBooks} = useContext(numOfBooksContext);
    const {books, setBooks} = useContext(BookContext);
    const [thisBook, setThisBook] = useState(book);
    const [modalIsOpen, setIsOpen] = useState(false);

    Modal.setAppElement('#root');


    const deleteBook = (book) => {
        if (
            window.confirm(
                'Da li ste sigurni da zelite da obrisete knjigu?'
            ) === true
        ) {
            axios.delete('/books/' + book._id).then((res) => {
                window.alert('Knjiga je uspesno obrisana');
                const index = books.indexOf(book);
                const newBooks = books.splice(index, 1);
                setBooks(newBooks);
                setNumOfBooks(numOfBooks - 1);
            });
        }
    };

    const editBook = (editedBook) => {
        setThisBook(editedBook);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <tr>
            <td>{thisBook.title}</td>
            <td>{thisBook.author}</td>
            <td>{thisBook.publisher}</td>
            <td>{thisBook.note}</td>
            <td>
                <button onClick={() => deleteBook(thisBook)} className="actionBtn">
                    Obrisi knjigu
                </button>
                <button onClick={openModal} className="actionBtn">
                    Izmeni knjigu
                </button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Izmeni knjigu"
                >
                    <EditBook book={thisBook} editBook={editBook} />
                </Modal>
            </td>
        </tr>
    );
};

export { BookRow as default };
