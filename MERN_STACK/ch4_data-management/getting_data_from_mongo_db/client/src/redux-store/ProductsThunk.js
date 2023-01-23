// Write some Code here

import { createAsyncThunk } from "@reduxjs/toolkit";
import fetch from "../fetch"

const getProductsFromServer = createAsyncThunk(
    'getProductsFromServer',
    async () => {
        try {
            const products = await fetch("http://localhost/get-products");
            return { products };
        } catch (error) {
            throw error;
        }
    }
);

export default getProductsFromServer;