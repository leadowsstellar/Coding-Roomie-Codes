// Write some Code here

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import booksSlice from './redux-store/BooksSlice';

export default function BooksManagerComponent() {
    const booksSliceState = useSelector(store => store.booksSliceState);
    const dispatch = useDispatch();

    const getBooks = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost/get-books', true);
        xhr.onload = () => {
            const json = xhr.responseText;
            const booksData = JSON.parse(json);
            dispatch(booksSlice.actions.setBooks({ books: booksData }));
        };
        xhr.send();
    }

    return (<div> <button onClick={getBooks} >Get Books</button>
        {booksSliceState.books.map((book, index) => (
            <div key={index} style={{ border: "1px solid black", padding: "10px", margin: "10px", display: "inline-block" }}>
                <div>{book.name}</div>
                <div>{book.author}</div>
                <div>{book.price}</div>
            </div>
        ))}
    </div>);
}