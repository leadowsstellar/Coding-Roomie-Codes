// Write some Code here

import { useDispatch, useSelector } from 'react-redux';
import booksSlice from './redux-store/BooksSlice';
import getBooksFromServer from "./redux-store/BooksThunk";

export default function BooksManagerComponent() {
    const booksSliceState = useSelector(store => store.booksSliceState);
    const dispatch = useDispatch();

    const getBooks = () => {
        dispatch(getBooksFromServer());
    }

    return (<div> <button onClick={getBooks} >Get Books</button>
        {booksSliceState.isLoading && <div>Please Wait ...</div>}
        {booksSliceState.error && <div style={{ color: "red" }}>{booksSliceState.error}</div>}
        {booksSliceState.books.map((book, index) => (
            <div key={index} style={{ border: "1px solid black", padding: "10px", margin: "10px", display: "inline-block" }}>
                <div>{book.name}</div>
                <div>{book.author}</div>
                <div>{book.price}</div>
            </div>
        ))}
    </div>);
}