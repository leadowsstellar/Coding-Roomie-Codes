// Write some Code here

import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: {
        products: [],
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload.products;
        }
    },
});

export default productsSlice;