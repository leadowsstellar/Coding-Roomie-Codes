// Write some Code here

import { createAsyncThunk } from "@reduxjs/toolkit";
import fetch from "../fetch";

export const getBooksFromServer = createAsyncThunk(
    'getBooksFromServer',
    async () => {
        try {
            const books = await fetch({ url: "http://localhost/get-books", method: "get" });
            return { books };
        } catch (error) {
            throw error;
        }
    }
);

export const saveBooksToServer = createAsyncThunk(
    'saveBooksToServer',
    async (data) => {
        try {
            const books = await fetch({ url: "http://localhost/save-books", method: "post", data });
            return { books };
        } catch (error) {
            throw error;
        }
    }
);