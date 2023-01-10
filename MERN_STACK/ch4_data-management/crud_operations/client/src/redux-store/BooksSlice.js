// Write some Code here

import { createSlice } from "@reduxjs/toolkit";
import { getBooksFromServer, saveBooksToServer } from "./BooksThunk";
const ObjectID = require("bson-objectid");

const booksSlice = createSlice({
    name: 'booksSlice',
    initialState: {
        books: [],
        isLoading: false,
        error: null,
        originalBookForEdit: null,
        isSaving: false,
    },

    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload.books;
        },

        addNewBook: (state, action) => {
            const newBook = { _id: ObjectID().toHexString(), name: "", author: "", price: 0, status: "new & edit" };
            state.books = [...state.books, newBook];
        },

        deleteBook: (state, action) => {
            let newStatus = "";
            switch (action.payload.book.status) {
                case "from-server":
                    newStatus = "from-server & deleted";
                    state.books = state.books.map(book => book._id === action.payload.book._id ? { ...book, status: newStatus } : book);
                    break;
                case "from-server & updated":
                    newStatus = "from-server & deleted";
                    state.books = state.books.map(book => book._id === action.payload.book._id ? { ...book, status: newStatus } : book);
                    break;
                case "new & updated":
                    state.books = state.books.filter(book => book._id !== action.payload.book._id);
                    break;
                default:
                    newStatus = action.payload.status;
                    break;
            }
        },

        nameChange: (state, action) => { state.books = state.books.map(book => book._id === action.payload.book._id ? { ...book, name: action.payload.name } : book) },
        authorChange: (state, action) => { state.books = state.books.map(book => book._id === action.payload.book._id ? { ...book, author: action.payload.author } : book) },
        priceChange: (state, action) => { state.books = state.books.map(book => book._id === action.payload.book._id ? { ...book, price: action.payload.price } : book) },

        editBook: (state, action) => {
            state.originalBookForEdit = action.payload.book;
            let newStatus = "";
            switch (action.payload.book.status) {
                case "from-server":
                    newStatus = "from-server & edit";
                    break;
                case "from-server & updated":
                    newStatus = "from-server & edit";
                    break;
                case "new & updated":
                    newStatus = "new & edit";
                    break;
                default:
                    newStatus = action.payload.status;
                    break;
            }
            state.books = state.books.map(book => book._id === action.payload.book._id ? { ...book, status: newStatus } : book);
        },

        updateBook: (state, action) => {
            let newStatus = "";
            switch (action.payload.book.status) {
                case "from-server & edit":
                    newStatus = "from-server & updated";
                    break;
                case "new & edit":
                    newStatus = "new & updated";
                    break;
                default:
                    newStatus = action.payload.status;
                    break;
            }
            state.books = state.books.map(book => book._id === action.payload.book._id ? { ...book, status: newStatus } : book);
        },

        cancelEditBook: (state, action) => {
            if (action.payload.book.status === "new & edit") {
                state.books = state.books.filter(book => book._id !== action.payload.book._id);
            } else {
                state.books = state.books.map(book => book._id === action.payload.book._id ? state.originalBookForEdit : book);
                state.originalBookForEdit = null;
            }
        },

    },

    extraReducers: (builder) => {
        builder.addCase(getBooksFromServer.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });

        builder.addCase(getBooksFromServer.fulfilled, (state, action) => {
            state.books = action.payload.books.map(book => ({ ...book, status: "from-server" }));
            state.isLoading = false;
        });

        builder.addCase(getBooksFromServer.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        });

        builder.addCase(saveBooksToServer.rejected, (state, action) => {
            state.isSaving = false;
        });

        builder.addCase(saveBooksToServer.pending, (state, action) => {
            state.isSaving = true;
        });

        builder.addCase(saveBooksToServer.fulfilled, (state, action) => {
            state.isSaving = false;
            state.books = action.payload.books.map(book => ({ ...book, status: "from-server" }));
        });
    },
});

export default booksSlice;