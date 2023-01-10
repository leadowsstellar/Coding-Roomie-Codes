// Write some Code here

import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
    name: 'booksSlice',
    initialState: {
        books: [],
    },
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload.books;
        }
    },
});

export default booksSlice;