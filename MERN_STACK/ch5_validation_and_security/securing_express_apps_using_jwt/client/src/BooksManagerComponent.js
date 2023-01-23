// Write some Code here

import { useDispatch, useSelector } from 'react-redux';
import booksSlice from './redux-store/BooksSlice';
import { getBooksFromServer, saveBooksToServer } from "./redux-store/BooksThunk";

function BookView({ book, index }) {
    const dispatch = useDispatch();
    return (
        <div key={index} style={{ border: "1px solid black", padding: "10px", margin: "10px", display: "inline-block" }}>
            <div>{book.name}</div>
            <div>{book.author}</div>
            <div>{book.price}</div>
            <button onClick={() => dispatch(booksSlice.actions.deleteBook({ book }))}>Delete</button>
            <button onClick={() => dispatch(booksSlice.actions.editBook({ book }))}>Edit</button>
            <div>status: {book.status}</div>
        </div>
    );
}

function BookEditView({ book, index }) {
    const dispatch = useDispatch();
    return (
        <div key={index} style={{ border: "1px solid black", padding: "10px", margin: "10px", display: "inline-block" }}>
            Name: <input type="text" value={book.name} onChange={(e) => dispatch(booksSlice.actions.nameChange({ book, name: e.target.value }))} />
            <br />
            Author: <input type="text" value={book.author} onChange={(e) => dispatch(booksSlice.actions.authorChange({ book, author: e.target.value }))} />
            <br />
            Price: <input type="text" value={book.price} onChange={(e) => dispatch(booksSlice.actions.priceChange({ book, price: e.target.value }))} />
            <br />
            <button onClick={() => dispatch(booksSlice.actions.updateBook({ book }))}>Update</button>
            <button onClick={() => dispatch(booksSlice.actions.cancelEditBook({ book }))}>Cancel</button>
            <br />
            <div>status: {book.status}</div>
        </div>
    );
}

export default function BooksManagerComponent() {
    const booksSliceState = useSelector(store => store.booksSliceState);
    const userSliceState = useSelector(store => store.userSliceState);
    const dispatch = useDispatch();

    const getBooks = () => {
        dispatch(getBooksFromServer({ jwtToken: userSliceState.jwtToken }));
    }

    return (<div> <button onClick={getBooks} >Get Books</button>
        {booksSliceState.isLoading && <div>Please Wait ...</div>}
        {booksSliceState.error && <div style={{ color: "red" }}>{booksSliceState.error}</div>}
        {booksSliceState.books.map((book, index) =>
            (book.status === "from-server" || book.status === "from-server & updated" || book.status === "new & updated")
                ? <BookView book={book} index={index} />
                : (book.status === "from-server & edit" || book.status === "new & edit") && <BookEditView book={book} index={index} />
        )}
        <br />
        <button onClick={() => dispatch(booksSlice.actions.addNewBook())}>Add New Book</button>
        <br />
        {booksSliceState.isSaving
            ? <div> "Saving..." </div>
            : <button onClick={() => dispatch(saveBooksToServer({ books: booksSliceState.books, jwtToken: userSliceState.jwtToken }))}>Save To Database</button>}
    </div>);
}