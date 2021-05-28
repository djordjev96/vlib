import React, { useState, useEffect } from 'react';
import axios from '../api';
import FilterableBookTable from './FilterableBookTable';
import AddBook from './AddBook';
import numOfBooksContext from '../numOfBooksContext';
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

const MainComponent = () => {
    const [numOfBooks, setNumOfBooks] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);

    Modal.setAppElement('#root');

    useEffect(() => {
        axios.get('/books').then((res) => {
            const numOfBooks = res.data.numOfBooks;
            setNumOfBooks(numOfBooks);
        }).catch((e) => console.log(e));
    }, []);

    const closeModal = () => {
        setIsOpen(false);
    };
    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <numOfBooksContext.Provider value={{ numOfBooks, setNumOfBooks }}>
            <div>
                Ukupno knjiga u biblioteci: {numOfBooks} <br />
                <button onClick={openModal}>Dodaj knjigu</button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Dodaj knjigu"
                >
                    <AddBook />
                </Modal>
                <FilterableBookTable />
            </div>
        </numOfBooksContext.Provider>
    );
};

export default MainComponent;
