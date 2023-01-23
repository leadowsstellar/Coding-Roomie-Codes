// Write some Code here

import { createSlice } from "@reduxjs/toolkit";
import getProductsFromServer from "./ProductsThunk";

const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: {
        products: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload.products;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getProductsFromServer.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(getProductsFromServer.fulfilled, (state, action) => {
            state.products = action.payload.products;
            state.isLoading = false;
            state.error = null;
        });

        builder.addCase(getProductsFromServer.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        });
    },

});

export default productsSlice;