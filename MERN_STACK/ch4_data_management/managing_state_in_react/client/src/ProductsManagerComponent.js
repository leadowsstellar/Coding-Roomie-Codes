// Write some Code here

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productsSlice from './redux-store/ProductsSlice';

export default function ProductsManagerComponent() {
    const productsSliceState = useSelector(store => store.productsSliceState);
    const dispatch = useDispatch();

    const getProducts = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost/get-products', true);
        xhr.onload = () => {
            const json = xhr.responseText;
            const productsData = JSON.parse(json);
            dispatch(productsSlice.actions.setProducts({ products: productsData }));
        };
        xhr.send();
    }

    return (<div> <button onClick={getProducts} >Get Products</button>
        {productsSliceState.products.map((product, index) => (
            <div key={index} style={{ border: "1px solid black", padding: "10px", margin: "10px", display: "inline-block" }}>
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>{product.quantity}</div>
            </div>
        ))}
    </div>);
}
