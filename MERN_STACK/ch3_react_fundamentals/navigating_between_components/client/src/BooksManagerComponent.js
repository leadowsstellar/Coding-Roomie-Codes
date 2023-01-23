// < !--Write some Code here-- >

import { useState } from 'react';
export default function BooksManagerComponent() {
    const [books, setBooks] = useState([]);
    const getBooks = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost/get-books', true);
        xhr.onload = () => {
            const json = xhr.responseText;
            const booksData = JSON.parse(json);
            setBooks(booksData);
        };
        xhr.send();
    }

    return (<div> <button onClick={getBooks} >Get Books</button>
        {books.map((book, index) => (
            <div key={index} style={{ border: "1px solid black", padding: "10px", margin: "10px", display: "inline-block" }}>
                <div>{book.name}</div>
                <div>{book.author}</div>
                <div>{book.price}</div>
            </div>
        ))}
    </div>);
}