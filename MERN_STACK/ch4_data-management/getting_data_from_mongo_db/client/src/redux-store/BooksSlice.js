// Write some Code here

import { createSlice } from "@reduxjs/toolkit";
import getBooksFromServer from "./BooksThunk";

const booksSlice = createSlice({
    name: 'booksSlice',
    initialState: {
        books: [],
        isLoading: false,
        error: null,
    },

    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload.books;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getBooksFromServer.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(getBooksFromServer.fulfilled, (state, action) => {
            state.books = action.payload.books;
            state.isLoading = false;
            state.error = null;
        });

        builder.addCase(getBooksFromServer.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        });
    },
});

export default booksSlice;