// Write some Code here

import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./BooksSlice";
import productsSlice from "./ProductsSlice";

export const store = configureStore({
    reducer: {
        booksSliceState: booksSlice.reducer,
        productsSliceState: productsSlice.reducer
    },
});