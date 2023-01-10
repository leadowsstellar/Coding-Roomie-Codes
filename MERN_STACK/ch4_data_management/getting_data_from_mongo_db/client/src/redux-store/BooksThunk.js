// Write some Code here

import { createAsyncThunk } from "@reduxjs/toolkit";
import fetch from "../fetch";

const getBooksFromServer = createAsyncThunk(
    'getBooksFromServer',
    async () => {
        try {
            const books = await fetch("http://localhost/get-books");
            return { books };
        } catch (error) {
            throw error;
        }
    }
);

export default getBooksFromServer;